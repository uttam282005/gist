import { useState, useEffect, useContext } from 'react'
import axios from "axios"
import { CurrentSessionContext } from '@/contexts'
import { useNavigate, useParams } from "react-router-dom"
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

export const UpdateBlog = () => {
  const currentUser = useContext(CurrentSessionContext);
  const { id } = useParams();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
          }
        });
        if (response.data.success) {
          setTitle(response.data.blog.title);
          setDescription(response.data.blog.content);
          setLoading(false);
        } else {
          setError(true);
          setErrorMessage(response.data.message);
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

  const handleUpdate = async () => {
    try {
      setLoading(true)
      const response = await axios.put(`${BACKEND_URL}/api/v1/blog`, {
        updatedTitle: title,
        updatedContent: description,
        blogId: id,
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
    return <Spinner />
  }

  if (error) {
    return <Error message={errorMessage} />
  }

  return (
    <div>
      <Appbar username={currentUser?.username} userId={currentUser?.id} />
      <div className="container mx-auto px-4 py-2">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Sparkles className="mr-2 h-6 w-6" />
              Update Post
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
            <Button onClick={handleUpdate} disabled={loading}>
              <Send className="mr-2 h-4 w-4" />
              Update Post
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
