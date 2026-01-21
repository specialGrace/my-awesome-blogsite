import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogContext } from './Context/BlogContext';  // adjust path if needed

const CategoryPage = () => {
  const { category } = useParams();
  const { posts } = useContext(BlogContext);

  // Normalize category name (case-insensitive match)
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  const filteredPosts = posts
    .filter(p => p.category?.toLowerCase() === category.toLowerCase())
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)); // newest first

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-6 py-16 md:py-24 max-w-5xl">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-center mb-16 md:mb-20">
        {normalizedCategory}
      </h1>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-xl text-text-muted italic">
          No posts in "{normalizedCategory}" yet... come back soon ♡
        </div>
      ) : (
        <div className="space-y-20 md:space-y-28">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              {post.featuredImage && (
                <Link to={`/post/${post.id}`} className="block overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-64 md:h-80 lg:h-[28rem] object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </Link>
              )}

              <div className={post.featuredImage && index % 2 === 1 ? 'md:order-1' : ''}>
                <p className="text-text-muted italic mb-4 text-center md:text-left">
                  {formatDate(post.createdAt)}
                </p>
                <Link to={`/post/${post.id}`}>
                  <h3 className="text-3xl md:text-4xl font-serif italic hover:text-site-pink transition-colors mb-5 text-center md:text-left leading-tight">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-lg text-text-muted leading-relaxed text-center md:text-left mb-6 line-clamp-3">
                  {post.excerpt || post.content.slice(0, 160) + '...'}
                </p>
                <Link
                  to={`/post/${post.id}`}
                  className="inline-block text-site-pink font-medium hover:underline"
                >
                  Continue reading →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="text-center mt-16">
        <Link
          to="/"
          className="text-site-pink hover:underline text-lg"
        >
          ← Back to all posts
        </Link>
      </div>
    </div>
  );
};

export default CategoryPage;