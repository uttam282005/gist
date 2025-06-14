import os
from langchain import hub
from langchain_core.messages import SystemMessage
from langchain_groq import ChatGroq
from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import
from langchain_community.document_loaders import DataFrameLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from langchain_core.prompts import ChatPromptTemplate
from langchain.schema.runnable import RunnablePassthrough

# boilerplate using ai
app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for all routes
# Set up your Google API key
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY") or ""
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY") or ""
# PostgreSQL connection URL
db_url = os.getenv("db_url") or ""

# Create SQLAlchemy engine
engine = create_engine(db_url)


def fetch_blog_by_id(blog_id):
    query = text("""
    SELECT id, title, content 
    FROM "Post" 
    WHERE id = :blog_id
    """)
    try:
        with engine.connect() as connection:
            result = connection.execute(query, {"blog_id": blog_id})
            df = pd.DataFrame(result.fetchall(), columns=result.keys())
        if df.empty:
            raise ValueError(f"No blog post found with id {blog_id}")
        return df
    except SQLAlchemyError as e:
        raise Exception(f"Database error: {str(e)}")


def process_blog(df):
    # loading blog content from the retirieved datafrome
    loader = DataFrameLoader(df, page_content_column="content")
    data = loader.load()
    # setting up the model for generating embeddings (jo mil jaye)
    embedding = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    # chunking the data for better retrival
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    # chunking the data for better retrival
    chunks = text_splitter.split_documents(data)
    # using chrome db for similarity search (using cosine similarity)
    vectorstore = Chroma.from_documents(documents=chunks, embedding=embedding)
    # retriver
    retriever = vectorstore.as_retriever(
        search_type="similarity", search_kwargs={"k": 2}
    )
    return retriever


@app.route("/blog/<blog_id>", methods=["GET"])
def get_blog(blog_id):
    try:
        df = fetch_blog_by_id(blog_id)
        return jsonify(
            {
                "id": df["id"].iloc[0],
                "title": df["title"].iloc[0],
                "content": df["content"].iloc[0],
            }
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/generate", methods=["POST"])
def generate_response():
    data = request.json
    if not data or "blog_id" not in data or "query" not in data:
        return jsonify({"error": "Missing blog_id or query in request"}), 400

    blog_id = data["blog_id"]
    query = data["query"]

    try:
        df = fetch_blog_by_id(blog_id)
        retriever = process_blog(df)

        llm = ChatGroq(model="llama-3.1-8b-instant")

        # RetrivalOA chain was unnecessary headache
        # writing custom prompt template

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are a helpful AI assistant with expertise in the content of the blog post. Your task is to answer questions based on the information provided in the blog post. Please provide accurate and relevant responses, citing specific details from the blog when appropriate. If the blog doesn't contain relevant information about user's query then say polity say I don't know. do greeting's and be polite.",
                ),
                ("placeholder", "{context}"),
                (
                    "human",
                    "Blog title: {blog_title}\n\nQuestion: {query}\n\nPlease answer the question based on the content of the blog post.",
                ),
            ]
        )
        retrived_docs = retriever.invoke(query)

        context = ""
        for docs in retrived_docs:
            context += docs.page_content + " "

        rag_chain = prompt | llm

        # context needs to be a list of base messages (a simple api request to the model with retirieved blog content  would have been better)
        result = rag_chain.invoke(
            {
                "context": [df["content"].iloc[0]],
                "blog_title": df["title"].iloc[0],
                "query": query,
            }
        )

        return jsonify(
            {
                "blog_title": df["title"].iloc[0],
                "content": df["content"].iloc[0],
                "query": query,
                "generated_response": result.content,
                "source_documents": [
                    doc.page_content for doc in retriever.get_relevant_documents(query)
                ],
            }
        )
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
