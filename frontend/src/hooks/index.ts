import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

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
      setUserPosts(response.data.userDetails);
    }
    getUserData()
  }, [id])
  return userPosts;
}

