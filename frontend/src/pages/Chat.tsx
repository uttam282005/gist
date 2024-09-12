import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Preview } from './Preview'

type Message = {
  id: number
  text: string
  sender: 'user' | 'ai'
}

export default function ChatInterface() {
  const { id: blog_id } = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await axios.post('http://127.0.0.1:5000/generate', {
        blog_id,
        query: inputValue
      })

      const aiMessage: Message = {
        id: Date.now(),
        text: response.data.generated_response,
        sender: 'ai'
      }
      setMessages(prevMessages => [...prevMessages, aiMessage])
    } catch (error) {
      console.error('Error fetching AI response:', error)
      const errorMessage: Message = {
        id: Date.now(),
        text: 'Sorry, there was an error getting the AI response.',
        sender: 'ai'
      }
      setMessages(prevMessages => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-[100dvh] bg-gray-100">
      {/* Chat Header */}
      <div className="bg-white p-3 shadow">
        <h1 className="text-lg font-semibold">Chat with Blog</h1>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-grow p-3" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg ${message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white text-gray-800 border'
                  }`}
              >
                <Preview source={message.text} />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-[85%] p-3 rounded-lg bg-gray-200 animate-pulse">
                <div className="h-2 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-2 bg-gray-300 rounded w-5/6 mb-2"></div>
                <div className="h-2 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-3 bg-white border-t">
        <form
          onSubmit={e => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex space-x-2"
        >
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit" size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
