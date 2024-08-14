import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import { Error } from "../components/Error"
import { indexOf } from "lodash"
import { BlogCardSkeleton } from "../components/Skeleton"

export interface Blog {
  "content": string;
  "createdAt": string;
  "title": string;
  "id": string;
  "author": {
    "username": string,
    "id": string
  }
}

export const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      setLoading(true);
      axios.get(`${BACKEND_URL}/api/v1/blog`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem("token"),
        }
      }).then((res) => {
        if (res.data.success) {
          setBlogs(res.data.publishedBlogs);
          setLoading(false);
        } else {
          setErrorMessage(res.data.message);
          setError(true);
          setLoading(false);
        }
      }).catch((error) => {
        console.error(error)
        setLoading(false);
        setError(true);
        setErrorMessage("Internal server error");
      });
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage("Internal server error");
      console.error(error);
    }
  }, []);
  return (loading ?
    <div className="flex justify-center flex-col place-items-center">
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
    </div>
    : error ?
      <div className="min-h-screen flex flex-col">
        <Appbar />
        <div className="flex-grow flex justify-center items-center">
          < Error message={errorMessage} />
        </div >
      </div >
      :
      <div>
        <div>
          <Appbar />
        </div>
        <div className="flex justify-center flex-col place-items-center">
          {blogs && blogs[0] ? blogs?.map((blog) => <BlogCard key={indexOf(blogs, blog)} id={blog.id} title={blog.title} content={blog.content} authorName={blog.author.username} createdAt={blog.createdAt} authorId={blog.author.id} />) : <div>No blogs found </div>}
        </div>
      </div >
  )
}
