import React from 'react';
import { BookOpen, Star, TrendingUp } from 'lucide-react';
import { Appbar } from '../components/Appbar';
import { NavLink } from '../components/Appbar';
import { Link } from 'react-router-dom';

interface BlogPost {
  title: string;
  author: string;
  date: string;
  link: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
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

const BlogPost: React.FC<BlogPost> = ({ title, author, date, readTime, image, link }) => (
  <Link to={link}>
    <div className="flex flex-col md:flex-row mb-8 bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
      <div className="p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{author}</p>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <span>{date}</span>
          <span className="mx-2">·</span>
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  </Link>
);

export const Landing: React.FC = () => {
  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Create', href: '/publish' },
    { name: 'Sign up', href: '/signup' },
    { name: 'Sign in', href: '/signin' }
  ];
  return (
    <div className="bg-gray-200 min-h-screen">
      <Appbar navLinks={navLinks} />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Stories</h2>
          {blogPosts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Curated Reading Lists</h3>
            <p className="text-gray-600">Discover handpicked articles on your favorite topics.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Star className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Premium Content</h3>
            <p className="text-gray-600">Access exclusive stories from top writers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <TrendingUp className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Trending Topics</h3>
            <p className="text-gray-600">Stay updated with the latest discussions.</p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <p className="text-center">&copy; 2024 Gist Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

