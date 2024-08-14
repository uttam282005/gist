import React from 'react';
import { Appbar } from '../components/Appbar';
import { Users, Target, BookOpen, Award } from 'lucide-react';

const TeamMember: React.FC<{ name: string; role: string; image: string }> = ({ name, role, image }) => (
  <div className="flex flex-col items-center">
    <img src={image} alt={name} className="w-32 h-32 rounded-full mb-4 object-cover" />
    <h3 className="text-xl font-semibold">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <div>
      <Appbar showAvator={false}/>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800">About Our Blog</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At our core, we believe in the power of words to inspire, educate, and connect. Our mission is to create a platform where ideas flourish, voices are heard, and communities are built around shared interests and passions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center text-center">
                <Target className="w-16 h-16 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Empowering Voices</h3>
                <p className="text-gray-600">We provide a platform for diverse perspectives, encouraging dialogue and understanding.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <BookOpen className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fostering Learning</h3>
                <p className="text-gray-600">Our content aims to educate, challenge, and expand horizons across various fields.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="w-16 h-16 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Building Community</h3>
                <p className="text-gray-600">We create spaces for like-minded individuals to connect, share, and grow together.</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2020, our blog started as a small passion project and has since grown into a vibrant community of writers and readers from around the globe. We've weathered challenges, celebrated milestones, and continuously evolved to meet the needs of our growing audience.
            </p>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <Award className="w-12 h-12 text-yellow-500" />
              <p className="text-lg font-semibold">Recognized as one of the Top 10 Emerging Blogging Platforms in 2023</p>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TeamMember name="Uttam Raj" role="Founder & Editor-in-Chief" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpgH-Ja36phm6ZMX8IfMAUeTQgtc3RsdMpog&s" />
              <TeamMember name="John Smith" role="Head of Content" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu1tMAJxoG3V7nxBkl7RbS7YAy9h4UWvRBxyZVH1JFxqylhvJ7eLkdC8RmQLYnTHrkeYU" />
              <TeamMember name="Emily Johnson" role="Community Manager" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtd0soCSRdpo8Y5klekJdABh4emG2P29jwg&s" />
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 text-white py-8 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Our Blog. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
