import { useEffect } from 'react';
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { BrainCircuit, MessageSquare, Pencil, Zap, Target, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    title: "Computer Vision: The Science of Teaching Machines to See",
    author: "Uttam Raj",
    date: "July 12",
    readTime: "5 min read",
    link: "/blog/a501f579-a7b4-42ae-a45f-af7be66881b9",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqVnr4rStp_c5W7dqN6tYkHwiA7unS7o7LQ&s",
  },
  {
    title: "How to Write a Blog Post: A Step-by-Step Guide",
    author: "Uttam",
    date: "Mar 10",
    readTime: "7 min read",
    link: "/blog/e987739f-3ef6-43af-b71e-8df29ca9da09",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZbifEHJ5Zhnqjb7AYmWGDW9a4ZVL7-PDmKA&s",
  },
  {
    title: "Deep Learning: Unlocking the Power of Neural Networks",
    author: "Uttam Raj",
    date: "Mar 5",
    link: "/blog/fb360a12-4c09-4f99-9321-eaea8cab0bdf",
    readTime: "6 min read",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*Q0uAcG_S2J2gkcUaF5PyxA.png",
  },
];
export default function LandingPage() {
  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      const targetId = href?.replace('#', '');
      const elem = document.getElementById(targetId!);
      elem?.scrollIntoView({
        behavior: 'smooth'
      });
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(each => (each as HTMLElement).addEventListener('click', handleScroll));
    return () => {
      links.forEach(each => (each as HTMLElement).removeEventListener('click', handleScroll));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-background z-10">
        <a href="/" className="flex items-center justify-center">
          <BrainCircuit className="h-6 w-6 mr-2" />
          <span className="font-bold text-2xl">Gist</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/publish">
            Create
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/blogs">
            Blog
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/signin">
            Sign In
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Gist: Your AI-Powered Blogging Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Elevate your blogging experience with AI summarization, interactive chats, and seamless markdown editing.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg">Get Started</Button>
                <Button variant="outline" size="lg">Watch Demo</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Our Features</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <BrainCircuit className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>AI Summarizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
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
                  <p className="text-gray-500 dark:text-gray-400">
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
                  <p className="text-gray-500 dark:text-gray-400">
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link to={"/blog/a501f579-a7b4-42ae-a45f-af7be66881b9"}>
                <Card>
                  <CardHeader>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqVnr4rStp_c5W7dqN6tYkHwiA7unS7o7LQ&s"
                      alt="AI in Blogging"
                      className="rounded-t-lg object-cover w-full h-[200px]"
                    />
                    <CardTitle className="mt-4">Computer Vision: The Science of Teaching Machines to See</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Computer Vision is a field of artificial intelligence that enables machines to interpret and understand visual information from the world, much like humans do. By using techniques like image recognition, object detection, and deep learning, machines can process and analyze images or videos to perform tasks ranging from facial recognition to autonomous driving.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </CardFooter>
                </Card>
              </Link>
              <Card>
                <CardHeader>
                  <img
                    src="https://via.placeholder.com/400x200"
                    alt="Markdown Tips"
                    className="rounded-t-lg object-cover w-full h-[200px]"
                  />
                  <CardTitle className="mt-4">10 Markdown Tips for Better Writing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">Learn how to leverage Markdown to streamline your writing process and create beautifully formatted content.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <img
                    src="https://via.placeholder.com/400x200"
                    alt="Engaging Readers"
                    className="rounded-t-lg object-cover w-full h-[200px]"
                  />
                  <CardTitle className="mt-4">Engaging Readers with Interactive Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">Discover strategies to create interactive blog posts that keep your audience engaged and coming back for more.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
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
                  <p className="text-gray-500 dark:text-gray-400">
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
                  <p className="text-gray-500 dark:text-gray-400">
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
                  <p className="text-gray-500 dark:text-gray-400">
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
                <Button size="lg" variant="secondary">Get Started Now</Button>
                <Button size="lg" variant="outline">Schedule a Demo</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Gist. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#terms">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#privacy">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}
