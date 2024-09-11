import React, { useState, ChangeEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ReloadIcon } from "@radix-ui/react-icons"
import { BACKEND_URL } from '@/config'

interface UserSignInInput {
  username: string;
  email: string;
  password: string;
}


export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [input, setInput] = useState<UserSignInInput>({
    username: "",
    email: "",
    password: "",
  })

  async function sendRequest() {
    try {
      setLoading(true)
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        input
      )
      setLoading(false)
      const { token } = response.data
      if (response.data.success && token) {
        localStorage.setItem("token", token)
        navigate("/blogs")
      } else {
        setError(true)
        setErrorMessage(response.data.message)
      }
    } catch (error) {
      setLoading(false)
      setError(true)
      setErrorMessage("Server error")
      console.error(error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendRequest()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ReloadIcon className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            {type === "signup" ? "Create an account" : "Welcome back"}
          </h1>
          <div className="flex justify-center items-center mt-2">
            <p className="text-sm text-muted-foreground">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>
            <Link
              to={type === "signup" ? "/signin" : "/signup"}
              className="text-sm underline text-primary ml-2"
            >
              {type === "signup" ? "Sign in" : "Sign up"}
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInput({
                    ...input,
                    username: e.target.value,
                  })
                }
                placeholder="Enter your username"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  ...input,
                  email: e.target.value,
                })
              }
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  ...input,
                  password: e.target.value,
                })
              }
              placeholder="Enter your password"
            />
          </div>
          <Button className="w-full" type="submit">
            {type === "signup" ? "Sign up" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  )
}
