import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import { Appbar } from "../components/Appbar";
import { Error } from "../components/Error";
import { Spinner } from "../components/Spinner";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShowMDX } from "../components/ShowMDX";

interface SummaryParams {
  summary: string,
  loading: boolean,
  error: boolean,
  errorMessage: string,
}
const Summary = ({ summary, loading, error, errorMessage }: SummaryParams) => {
  if (loading) {
    return <div className="mt-4"><Spinner /></div>;
  }
  if (error) {
    return <Error message={errorMessage} />;
  }
  if (!summary) {
    return null;
  }
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Summary</h2>
      <p>{summary}</p>
    </div>
  );
};

export const FullBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
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
          withCredentials: true
        });
        if (!res.data.success) {
          setError(true);
          setErrorMessage(res.data.message);
          setLoading(false);
        } else {
          setTitle(res.data.blog.title);
          setContent(res.data.blog.content);
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
        withCredentials: true
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
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Appbar />
        <div className="flex-grow flex justify-center items-center">
          <Error message={errorMessage} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <main className="container mx-auto px-4 py-8">
        <article className="bg-white shadow-md rounded-lg overflow-hidden">
          <header className="bg-gray-800 text-white p-6">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-3xl font-bold">{title}</h1>
              <button onClick={handleSummarize} disabled={summaryLoading} className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                {summaryLoading ? 'Summarizing...' : 'Summarize'}
              </button>
            </div>
          </header>
          <div className="p-6">
            <Summary
              summary={summary}
              loading={summaryLoading}
              error={summaryError}
              errorMessage={summaryErrorMessage}
            />
            <div className="prose max-w-none mt-6">
              <ShowMDX source={content} />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};
