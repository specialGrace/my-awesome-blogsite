import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from './Context/BlogContext';
import { SiInstagram, SiPinterest } from 'react-icons/si';
import { FiSearch } from 'react-icons/fi';  

const Header = () => {
  const { isAuthenticated, logout } = useContext(BlogContext);

  return (
     <header className="sticky top-0 bg-white z-50 border-b border-site-pink/20 shadow-sm">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center max-w-7xl">
        {/* Logo / Site Title - Cursive & elegant */}
        <Link 
          to="/" 
          className="text-4xl md:text-5xl font-cursive text-text-dark hover:text-site-pink transition-colors"
        >
          Grace's Space
        </Link>

        {/* Desktop Navigation - Center-ish */}
        <nav className="hidden md:flex items-center gap-10 text-lg font-medium">
          <Link to="/" className="hover:text-site-pink transition-colors">Home</Link>
          <Link to="/category/style" className="hover:text-site-pink transition-colors">Lifestyle</Link>
          <Link to="/category/fashion" className="hover:text-site-pink transition-colors">Fashion</Link>
          <Link to="/category/tech" className="hover:text-site-pink transition-colors">Tech</Link>
          <Link to="/blog" className="hover:text-site-pink transition-colors">All Posts</Link>
        </nav>

        {/* Right side: Social + Search + Auth */}
        <div className="flex items-center gap-6 text-xl">
          {/* Social Icons */}
          <a href="https://instagram.com/yourhandle" className="hover:text-site-pink transition">
            <SiInstagram />
          </a>
          <a href="https://pinterest.com/yourhandle" className="hover:text-site-pink transition">
            <SiPinterest />
          </a>

          {/* Optional Search Icon */}
          <button className="hover:text-site-pink transition">
            <FiSearch />
          </button>

          {/* Auth - small and subtle */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4 text-base">
              <Link to="/admin" className="text-site-pink hover:underline">Admin</Link>
              <button onClick={logout} className="hover:text-site-pink">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block text-base hover:text-site-pink">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Nav Placeholder - simple for now (add hamburger later if needed) */}
      <nav className="md:hidden flex justify-center gap-6 py-4 border-t border-site-pink/10 text-lg">
        <Link to="/" className="hover:text-site-pink">Home</Link>
        <Link to="/category/style" className="hover:text-site-pink">Lifetyle</Link>
        <Link to="/category/fashion" className="hover:text-site-pink">Fashion</Link>
        <Link to="/category/tech" className="hover:text-site-pink">Tech</Link>
      </nav>
    </header>
  );
};

export default Header;