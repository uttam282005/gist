import { useContext, useEffect, useState } from 'react';
import { Avator } from './Avator';
import axios from 'axios';
import { Menu, ReceiptPoundSterling, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import { CurrentSessionContext } from '../contexts';

export interface NavLink {
  name: string,
  href: string
}

const defaultNavLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'About', href: '/about' },
  { name: 'Create', href: '/publish' },
];

export const Appbar = ({ navLinks = defaultNavLinks, showAvator = true }: { navLinks?: NavLink[], showAvator?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = useContext(CurrentSessionContext);
  const userId = currentUser?.id;
  const username = currentUser?.username;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-800">Gist</span>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                {link.name}
              </a>
            ))}
            {showAvator ? <div className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent'>
              <Avator name={username} id={userId} />
            </div> : null}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {
        isMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )
      }
    </nav >
  );
};

