import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import { Appbar } from "../components/Appbar";
import { Error } from "../components/Error";
import { Spinner } from "../components/Spinner";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShowMDX } from "../components/ShowMDX";
import { BookOpen, Clock, User } from 'lucide-react';

interface SummaryParams {
  summary: string,
  loading: boolean,
  error: boolean,
  errorMessage: string,
}

const Summary = ({ summary, loading, error, errorMessage }: SummaryParams) => {
  if (loading) {
    return null
  }
  if (error) {
    return <Error message={errorMessage} />;
  }
  if (!summary) {
    return null;
  }
  return (
    <div className="mt-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
        <BookOpen className="mr-2" size={24} />
        Summary
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed px-4">{summary}</p>
    </div>
  );
};

export const FullBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [summaryError, setSummaryError] = useState(false);
  const [summaryErrorMessage, setSummaryErrorMessage] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [summary, setSummary] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function getBlog() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
        if (!res.data.success) {
          setError(true);
          setErrorMessage(res.data.message);
          setLoading(false);
        } else {
          setTitle(res.data.blog.title);
          setContent(res.data.blog.content);
          setAuthor(res.data.blog.author.username);
          setCreatedAt(new Date(res.data.blog.createdAt).toLocaleDateString());
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setErrorMessage('Internal server error');
        setLoading(false);
      }
    }
    getBlog();
  }, [id]);

  const handleSummarize = async () => {
    try {
      setSummaryLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/summarize/${id}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      if (res.data.status) {
        setSummary(res.data.summary);
        setSummaryLoading(false);
      } else {
        setSummaryError(true);
        setSummaryErrorMessage(res.data.message);
        setSummaryLoading(false);
      }
    } catch (error) {
      console.error(error);
      setSummaryError(true);
      setSummaryErrorMessage("Internal server error");
      setSummaryLoading(false);
    }
  };

  if (loading) {
    return (
      <Spinner />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <Appbar />
        <div className="flex-grow flex justify-center items-center">
          <Error message={errorMessage} onClose={() => window.location.href = `/`} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Appbar />
      <main className="container mx-auto px-4 py-8">
        <article className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <header className="bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <div className="flex items-center text-sm text-gray-300">
              <User size={16} className="mr-2" />
              <span className="mr-4">{author}</span>
              <Clock size={16} className="mr-2" />
              <time dateTime={createdAt}>{createdAt}</time>
            </div>
          </header>
          <div className="p-8">
            <button
              onClick={handleSummarize}
              disabled={summaryLoading}
              className="mb-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              {
                summaryLoading ? (
                  <>
                    Summarizing...
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2" size={20} />
                    Summarize
                  </>
                )}
            </button>
            <Summary
              summary={summary}
              loading={summaryLoading}
              error={summaryError}
              errorMessage={summaryErrorMessage}
            />
            <div className="prose dark:prose-invert max-w-none mt-8">
              <ShowMDX source={content} />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};
