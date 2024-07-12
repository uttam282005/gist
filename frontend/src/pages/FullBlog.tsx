import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import { Appbar } from "../components/Appbar";
import { Error } from "../components/Error";
import { Spinner } from "../components/Spinner";
import { useParams } from "react-router-dom";
import { useSerialize } from "../hooks";
import { MDXRemote } from "next-mdx-remote";

export const FullBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const serializedContent = useSerialize(content);

  useEffect(() => {
    try {
      async function getBlog() {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
          }
        });
        setTitle(res.data.blog.title);
        setContent(res.data.blog.content);
        setLoading(false);
      }
      getBlog();
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMessage('Internal server error');
      setLoading(false)
    }
  }, []);

  return loading ?
    <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>
    : error ?
      <div className="min-h-screen flex flex-col">
        <Appbar />
        <div className="flex-grow flex justify-center items-center">
          < Error message={errorMessage} />
        </div >
      </div > :
      <div className="min-h-screen bg-gray-100">
        <Appbar />
        <main className="container mx-auto px-4 py-8">
          <article className="bg-white shadow-md rounded-lg overflow-hidden">
            <header className="bg-gray-800 text-white p-6">
              <h1 className="text-3xl font-bold">{title}</h1>
            </header>
            <div className="p-6">
              <div className="prose max-w-none">
                {serializedContent !== null && <MDXRemote {...serializedContent} />}
              </div>
            </div>
          </article>
        </main>
      </div>
}
