import { useEffect, useState } from "react";
import { useParams, useNavigate, SetURLSearchParams } from 'react-router-dom';
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Appbar } from "../components/Appbar";
import { Error } from "../components/Error";
import { ShowMDX } from "../components/ShowMDX";
import { BookOpen, Clock, User, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type SummaryProps = {
  summary: string,
  loading: boolean,
  error: boolean,
  errorMessage: string
}

const Summary = ({ summary, loading, error, errorMessage }: SummaryProps) => {
  if (loading) {
    return <Skeleton className="w-full h-24 mt-6" />;
  }
  if (error) {
    return <Error message={errorMessage} />;
  }
  if (!summary) {
    return null;
  }
  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-2xl font-bold flex items-center">
          <BookOpen className="mr-2" size={24} />
          Summary
        </h2>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{summary}</p>
      </CardContent>
    </Card>
  );
};

export const FullBlog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({
    title: '',
    author: '',
    createdAt: '',
    content: '',
  });
  const [summaryState, setSummaryState] = useState({
    summary: '',
    loading: false,
    error: false,
    errorMessage: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ isError: false, message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
        if (!res.data.success) {
          setError({ isError: true, message: res.data.message });
        } else {
          setBlogData({
            title: res.data.blog.title,
            content: res.data.blog.content,
            author: res.data.blog.author.username,
            createdAt: new Date(res.data.blog.createdAt).toLocaleDateString(),
          });
        }
      } catch (error) {
        setError({ isError: true, message: 'Internal server error' });
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, [id]);

  const handleSummarize = async () => {
    try {
      setSummaryState(prev => ({ ...prev, loading: true }));
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/summarize/${id}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      if (res.data.status) {
        setSummaryState(prev => ({ ...prev, summary: res.data.summary, loading: false }));
      } else {
        setSummaryState(prev => ({
          ...prev,
          error: true,
          errorMessage: res.data.message,
          loading: false
        }));
      }
    } catch (error) {
      console.error(error);
      setSummaryState(prev => ({
        ...prev,
        error: true,
        errorMessage: "Internal server error",
        loading: false
      }));
    }
  };

  const handleChatWithBlog = () => {
    navigate(`/chat/${id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="w-full h-12 mb-4" />
        <Skeleton className="w-3/4 h-8 mb-2" />
        <Skeleton className="w-1/2 h-6 mb-8" />
        <Skeleton className="w-full h-64" />
      </div>
    );
  }

  if (error.isError) {
    return (
      <Error message={error.message} onClose={() => navigate('/')} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Appbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{blogData.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center text-sm space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{blogData.author}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <time dateTime={blogData.createdAt}>{blogData.createdAt}</time>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <Button
                onClick={handleSummarize}
                disabled={summaryState.loading}
                className="w-full sm:w-auto"
              >
                {summaryState.loading ? (
                  "Summarizing..."
                ) : (
                  <>
                    <BookOpen className="mr-2" size={20} />
                    Summarize
                  </>
                )}
              </Button>
              <Button
                onClick={handleChatWithBlog}
                className="w-full sm:w-auto"
              >
                <MessageSquare className="mr-2" size={20} />
                Chat with Blog
              </Button>
            </div>
            <Summary
              summary={summaryState.summary}
              loading={summaryState.loading}
              error={summaryState.error}
              errorMessage={summaryState.errorMessage}
            />
            <div className="prose dark:prose-invert max-w-none mt-8">
              <ShowMDX source={blogData.content} />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
