import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export type Blogs = {
  title: string,
  authorId: string,
  content: string,
  createdAt: string,
  id: string
}

export interface UserDetailsType {
  username: string;
  id: string;
  post: Blogs[]
}

export const UseGetUserProfile = (id: string) => {
  const [userDetails, setUserDetails] = useState<UserDetailsType>()
  console.log(userDetails)
  useEffect(() => {
    async function getUserData() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/${id}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      setUserDetails(response.data.userDetails)
    }
    getUserData()
  }, [id])
  return userDetails;
}

