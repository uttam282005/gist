
import type React from "react"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, MessageSquare, Pencil, Zap, Target, Rocket, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function LandingPage() {
  useEffect(() => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault()
      const href = e.currentTarget.getAttribute("href")
      const targetId = href?.replace("#", "")
      const elem = document.getElementById(targetId!)
      elem?.scrollIntoView({
        behavior: "smooth",
      })
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((each) => (each as HTMLElement).addEventListener("click", handleScroll as any))
    return () => {
      links.forEach((each) => (each as HTMLElement).removeEventListener("click", handleScroll as any))
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-6 lg:px-8 h-16 flex items-center sticky top-0 bg-background/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center justify-center">
            <BrainCircuit className="h-7 w-7 mr-2 text-blue-600" />
            <span className="font-bold text-2xl">Gist</span>
          </Link>
          <nav className="flex gap-6">
            <Link to="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link to="/publish" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Create
            </Link>
            <Link to="/blogs" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link to="/signin" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                  Your AI-Powered <span className="text-blue-600">Blogging</span> Platform
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
                  Elevate your blogging experience with AI summarization, interactive chats, and seamless markdown
                  editing.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => (window.location.href = "/publish")}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create engaging, AI-enhanced content
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BrainCircuit className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">AI Summarizer</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    Get instant summaries of your blog posts, helping readers quickly grasp key points.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">RAG Chat Pipeline</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    Engage with your blog content through an interactive AI chat, powered by RAG technology.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Pencil className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Markdown Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    Create and edit your blogs with ease using our intuitive markdown editor.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Explore Our Demo Blogs</h2>
              <p className="text-lg text-muted-foreground">See our platform in action with these sample posts</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Link to="/blog/a501f579-a7b4-42ae-a45f-af7be66881b9" className="block group">
                <Card className="h-full flex flex-col border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <img
                      src="https://assets.skyfilabs.com/images/blog/what-is-computer-vision.webp"
                      alt="AI in Blogging"
                      className="rounded-t-lg object-cover w-full h-48"
                    />
                    <div className="p-6 pb-4">
                      <CardTitle className="text-lg leading-tight">
                        Computer Vision: The Science of Teaching Machines to See
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow px-6">
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                      Computer Vision is a field of artificial intelligence that enables machines to interpret and
                      understand visual information from the world, much like humans do.
                    </p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6">
                    <Button variant="ghost" className="w-full justify-between group-hover:text-blue-600">
                      Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
              <Link to={"/blog/9f540b5e-595f-4d27-be2a-9531a9b5cc68"} className="block group">
                <Card className="h-full flex flex-col border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <img
                      src="https://kirkstrobeck.github.io/whatismarkdown.com/img/markdown.png"
                      alt="Markdown Tips"
                      className="rounded-t-lg object-cover w-full h-48"
                    />
                    <div className="p-6 pb-4">
                      <CardTitle className="text-lg leading-tight">10 Markdown Tips for Better Writing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow px-6">
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                      Learn how to leverage Markdown to streamline your writing process and create beautifully formatted
                      content.
                    </p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6">
                    <Button variant="ghost" className="w-full justify-between group-hover:text-blue-600">
                      Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
              <Link to={"/blog/ebff04ea-c3b1-4455-bc88-bb6875c585d9"} className="block group">
                <Card className="h-full flex flex-col border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <img
                      src="https://images.inc.com/uploaded_files/image/1920x1080/getty_508586144_200013332000928073_324949.jpg"
                      alt="Engaging Readers"
                      className="rounded-t-lg object-cover w-full h-48"
                    />
                    <div className="p-6 pb-4">
                      <CardTitle className="text-lg leading-tight">Engaging Readers with Interactive Content</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow px-6">
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                      Discover strategies to create interactive blog posts that keep your audience engaged and coming
                      back for more.
                    </p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6">
                    <Button variant="ghost" className="w-full justify-between group-hover:text-blue-600">
                      Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose Gist?</h2>
              <p className="text-lg text-muted-foreground">Transform your content creation process</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl">Boost Productivity</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    Create content faster with AI assistance and easy-to-use tools.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Engage Readers</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    Increase reader interaction with AI-powered summaries and chat.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rocket className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Grow Your Audience</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    Expand your reach with more engaging and interactive content.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                  Ready to Transform Your Blogging Experience?
                </h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto text-pretty leading-relaxed">
                  Join Gist today and start creating AI-enhanced content that engages and grows your audience.
                </p>
              </div>
              <Button
                onClick={() => (window.location.href = "/publish")}
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Gist. All rights reserved.</p>
            <nav className="flex gap-6">
              <Link to="#terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
