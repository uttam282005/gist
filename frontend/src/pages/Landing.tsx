import { useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, MessageSquare, Pencil, Zap, Target, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  useEffect(() => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      const targetId = href?.replace('#', '');
      const elem = document.getElementById(targetId!);
      elem?.scrollIntoView({
        behavior: 'smooth'
      });
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(each => (each as HTMLElement).addEventListener('click', handleScroll as any));
    return () => {
      links.forEach(each => (each as HTMLElement).removeEventListener('click', handleScroll as any));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-background to-background/80 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <Link to="/" className="flex items-center justify-center">
          <BrainCircuit className="h-6 w-6 mr-2" />
          <span className="font-bold text-2xl">Gist</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link to="/publish" className="text-sm font-medium hover:underline underline-offset-4">
            Create
          </Link>
          <Link to="/blogs" className="text-sm font-medium hover:underline underline-offset-4">
            Blog
          </Link>
          <Link to="/signin" className="text-sm font-medium hover:underline underline-offset-4">
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Gist: Your AI-Powered Blogging Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Elevate your blogging experience with AI summarization, interactive chats, and seamless markdown editing.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={() => window.location.href = '/publish'} size="lg">Get Started</Button>
                <Button variant="outline" size="lg">Watch Demo</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Our Features</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <BrainCircuit className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>AI Summarizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get instant summaries of your blog posts, helping readers quickly grasp key points.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MessageSquare className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>RAG Chat Pipeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Engage with your blog content through an interactive AI chat, powered by RAG technology.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Pencil className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Markdown Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create and edit your blogs with ease using our intuitive markdown editor.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
              Explore Our Demo Blogs
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Link to="/blog/a501f579-a7b4-42ae-a45f-af7be66881b9" className="block">
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-grow-0">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="AI in Blogging"
                      className="rounded-t-lg object-cover w-full h-[200px]"
                    />
                    <CardTitle className="mt-4 text-lg">Computer Vision: The Science of Teaching Machines to See</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">Computer Vision is a field of artificial intelligence that enables machines to interpret and understand visual information from the world, much like humans do. By using techniques like image recognition, object detection, and deep learning, machines can process and analyze images or videos to perform tasks ranging from facial recognition to autonomous driving.</p>
                  </CardContent>
                  <CardFooter className="flex-grow-0">
                    <Button variant="ghost" className="w-full justify-start">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </CardFooter>
                </Card>
              </Link>
              <Card className="h-full flex flex-col">
                <CardHeader className="flex-grow-0">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Markdown Tips"
                    className="rounded-t-lg object-cover w-full h-[200px]"
                  />
                  <CardTitle className="mt-4 text-lg">10 Markdown Tips for Better Writing</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm line-clamp-3">Learn how to leverage Markdown to streamline your writing process and create beautifully formatted content.</p>
                </CardContent>
                <CardFooter className="flex-grow-0">
                  <Button variant="ghost" className="w-full justify-start">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </CardFooter>
              </Card>
              <Card className="h-full flex flex-col">
                <CardHeader className="flex-grow-0">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Engaging Readers"
                    className="rounded-t-lg object-cover w-full h-[200px]"
                  />
                  <CardTitle className="mt-4 text-lg">Engaging Readers with Interactive Content</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm line-clamp-3">Discover strategies to create interactive blog posts that keep your audience engaged and coming back for more.</p>
                </CardContent>
                <CardFooter className="flex-grow-0">
                  <Button variant="ghost" className="w-full justify-start">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Zap className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Boost Productivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create content faster with AI assistance and easy-to-use tools.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Engage Readers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Increase reader interaction with AI-powered summaries and chat.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Rocket className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Grow Your Audience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Expand your reach with more engaging and interactive content.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Transform Your Blogging Experience?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join Gist today and start creating AI-enhanced content that engages and grows your audience.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={() => window.location.href = '/publish'} size="lg" variant="secondary">Get Started Now</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t relative z-10">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Gist. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#terms" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link to="#privacy" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
