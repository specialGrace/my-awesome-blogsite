import React from 'react';
import { SiInstagram, SiPinterest } from 'react-icons/si';  // ← Fixed import

const Footer = () => {
  return (
<footer className="bg-gray/20 backdrop-blur-xl py-20 mt-32 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h3 className="text-4xl font-serif italic mb-8 text-text-dark">
          Let's Stay Connected ♡
        </h3>

        {/* Newsletter */}
        <form className="max-w-lg mx-auto mb-16">
          <p className="text-lg text-text-muted mb-6">
          Subscribe to enjoy a carefully curated newsletter full of my latest looks, blog posts, and little joys each week. 
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 border border-site-pink/40 rounded-full focus:outline-none focus:border-site-pink"
            />
            <button className="bg-site-pink text-white px-10 py-4 rounded-full hover:bg-pink-700 transition shadow-md">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-text-muted mt-4">*no spam, just pretty things x</p>
        </form>

        {/* Social Icons */}
        <div className="flex justify-center gap-10 text-3xl mb-12">
          <a href="https://instagram.com/yourhandle" className="hover:text-site-pink transition">
            <SiInstagram />
          </a>
          <a href="https://pinterest.com/yourhandle" className="hover:text-site-pink transition">
            <SiPinterest />
          </a>
          {/* Add more icons later: SiTiktok, SiYoutube, etc. */}
        </div>

        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} My Personal Space. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;