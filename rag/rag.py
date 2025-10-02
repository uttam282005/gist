import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

from langchain_community.document_loaders import DataFrameLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

# ------------------------------
# Flask + Config
# ------------------------------
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY") or ""
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY") or ""
db_url = os.getenv("db_url") or ""

engine = create_engine(db_url)

# Embedding model (Google Generative AI)
embedding_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

# Directory for persistent Chroma vectorstore
VECTORSTORE_DIR = "./chroma_db"


# ------------------------------
# Helpers
# ------------------------------
def fetch_blog_by_id(blog_id):
    """Fetch blog post by ID from Postgres."""
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


def build_or_load_vectorstore(blog_id, df):
    """Build vectorstore for blog if not already persisted."""
    blog_dir = os.path.join(VECTORSTORE_DIR, str(blog_id))

    if os.path.exists(blog_dir):
        # Load existing vectorstore
        vectorstore = Chroma(
            embedding_function=embedding_model,
            persist_directory=blog_dir
        )
    else:
        # Build new vectorstore
        loader = DataFrameLoader(df, page_content_column="content")
        data = loader.load()

        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = text_splitter.split_documents(data)

        vectorstore = Chroma.from_documents(
            documents=chunks,
            embedding=embedding_model,
            persist_directory=blog_dir
        )
        vectorstore.persist()

    return vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3})


# ------------------------------
# Routes
# ------------------------------
@app.route("/blog/<blog_id>", methods=["GET"])
def get_blog(blog_id):
    try:
        df = fetch_blog_by_id(blog_id)
        return jsonify({
            "id": df["id"].iloc[0],
            "title": df["title"].iloc[0],
            "content": df["content"].iloc[0],
        })
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
        retriever = build_or_load_vectorstore(blog_id, df)

        # Get relevant context
        docs = retriever.get_relevant_documents(query)
        context = "\n\n".join([doc.page_content for doc in docs])

        # LLM
        llm = ChatGroq(model="llama-3.1-8b-instant")

        # Prompt
        prompt = ChatPromptTemplate.from_messages([
            ("system",
             "You are a helpful AI assistant with expertise in the blog post. "
             "Answer ONLY based on the blog content. If unsure, politely say you don’t know."),
            ("system", "Context:\n{context}"),
            ("human",
             "Blog title: {blog_title}\n\nQuestion: {query}\n\nAnswer:")
        ])

        rag_chain = prompt | llm
        result = rag_chain.invoke({
            "context": context,
            "blog_title": df["title"].iloc[0],
            "query": query
        })

        return jsonify({
            "blog_title": df["title"].iloc[0],
            "query": query,
            "generated_response": result.content,
            "source_documents": [doc.page_content for doc in docs]
        })
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Something went wrong processing your request"}), 500


# ------------------------------
# Run App
# ------------------------------
if __name__ == "__main__":
    app.run(debug=True)

