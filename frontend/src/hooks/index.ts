import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { repeat, StringIterator } from "lodash";

export interface UserPosts {
  createdAt: string;
  title: string;
  content: string;
  id: string;
  author: {
    username: string,
    id: string,
    email: string,
  }
}
export const UseGetUserProfile = (id: string) => {
  const [userPosts, setUserPosts] = useState<UserPosts[]>();
  useEffect(() => {
    async function getUserData() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/${id}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      console.log(response.data.userDetails)
      setUserPosts(response.data.userDetails);
    }
    getUserData()
  }, [id])
  return userPosts;
}

export const useGetBlog = (id: string) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const getBlog = async () => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        }
      });
      if (response.data.success) {
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
      }
    }
    getBlog();
  }, [id]);
  return { title, content };
}

