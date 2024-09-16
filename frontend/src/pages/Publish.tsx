import { useContext, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Sparkles, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BACKEND_URL } from "../config"
import { Preview } from "./Preview"
import { Error } from '@/components/Error'
import { Spinner } from '@/components/Spinner'
import { Appbar } from '@/components/Appbar'
import { CurrentSessionContext } from '@/contexts'

export default function Publish() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const currentUser = useContext(CurrentSessionContext)
  const navigate = useNavigate()

  const handlePublish = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
        title,
        content: description
      }, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })
      if (!response.data.success) {
        setError(true)
        setErrorMessage(response.data.message)
      } else {
        navigate(`/blog/${response.data.blog.id}`)
      }
    } catch (error) {
      setError(true)
      setErrorMessage('Internal server error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Spinner />
    )
  }

  if (error) {
    return (
      <Error message={errorMessage} />
    )
  }

  return (
    <div>
      <Appbar userId={currentUser?.id} />
      <div className="container mx-auto px-4 py-2">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Sparkles className="mr-2 h-6 w-6" />
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Enter your title"
              className="mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Tabs defaultValue="write">
              <TabsList className="mb-4">
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="write">
                <Textarea
                  placeholder="Write your post content here (markdown and syntax highlighting supported)..."
                  className="min-h-[300px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </TabsContent>
              <TabsContent value="preview">
                <Card className="min-h-[300px]">
                  <CardContent className="prose max-w-none pt-6">
                    <Preview source={description} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handlePublish} disabled={loading}>
              <Send className="mr-2 h-4 w-4" />
              Publish Post
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
