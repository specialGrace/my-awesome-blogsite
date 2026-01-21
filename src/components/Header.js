import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { BlogContext } from './Context/BlogContext';
import { SiInstagram, SiPinterest } from 'react-icons/si';
import { FiSearch } from 'react-icons/fi';

const Header = () => {
  const { isAuthenticated, logout } = useContext(BlogContext);
  const location = useLocation(); 

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-pink-100/50 shadow-sm">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl md:text-5xl font-cursive text-text-dark hover:text-site-pink transition-colors"
        >
          Grace's Space
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-lg font-medium">
          <Link
            to="/"
            className={`transition-colors ${
              isActive('/') ? 'text-site-pink font-semibold' : 'hover:text-site-pink'
            }`}
          >
            Home
          </Link>
          <Link
            to="/category/lifestyle"
            className={`transition-colors ${
              isActive('/category/style') ? 'text-site-pink font-semibold' : 'hover:text-site-pink'
            }`}
          >
            Lifestyle
          </Link>
          <Link
            to="/category/fashion"
            className={`transition-colors ${
              isActive('/category/fashion') ? 'text-site-pink font-semibold' : 'hover:text-site-pink'
            }`}
          >
            Fashion
          </Link>
          <Link
            to="/category/tech"
            className={`transition-colors ${
              isActive('/category/tech') ? 'text-site-pink font-semibold' : 'hover:text-site-pink'
            }`}
          >
            Tech
          </Link>
          
          <Link
            to="/" 
            className={`transition-colors ${
              isActive('/') ? 'text-site-pink font-semibold' : 'hover:text-site-pink'
            }`}
          >
            All Posts
          </Link>
        </nav>

        {/* Right side: Social + Search + Auth */}
        <div className="flex items-center gap-6 text-xl">
          <a href="https://instagram.com/yourhandle" className="hover:text-site-pink transition">
            <SiInstagram />
          </a>
          <a href="https://pinterest.com/yourhandle" className="hover:text-site-pink transition">
            <SiPinterest />
          </a>
          <button className="hover:text-site-pink transition">
            <FiSearch />
          </button>

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4 text-base">
              <Link to="/admin" className="text-site-pink hover:underline">
                Admin
              </Link>
              <button onClick={logout} className="hover:text-site-pink">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block text-base hover:text-site-pink">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex justify-center gap-5 sm:gap-8 py-4 border-t border-site-pink/10 text-base sm:text-lg">
        <Link
          to="/"
          className={`hover:text-site-pink ${isActive('/') ? 'text-site-pink font-medium' : ''}`}
        >
          Home
        </Link>
               <Link
          to="/category/lifestyle"
          className={`hover:text-site-pink ${isActive('/category/lifestyle') ? 'text-site-pink font-medium' : ''}`}
        >
          Lifestyle
        </Link>
        <Link
          to="/category/fashion"
          className={`hover:text-site-pink ${isActive('/category/fashion') ? 'text-site-pink font-medium' : ''}`}
        >
          Fashion
        </Link>
            <Link
          to="/category/tech"
          className={`hover:text-site-pink ${isActive('/category/tech') ? 'text-site-pink font-medium' : ''}`}
        >
          Tech
        </Link>
      </nav>
    </header>
  );
};

export default Header;