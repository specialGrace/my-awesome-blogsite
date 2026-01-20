import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BlogContext } from './Context/BlogContext';

const CategoryPage = () => {
  const { category } = useParams();
  const { posts } = useContext(BlogContext);
  const filtered = posts.filter(p => p.category?.toLowerCase() === category.toLowerCase());

  return (
    <div className="container mx-auto px-6 py-16 md:py-24 max-w-5xl">
      <h2 className="text-4xl md:text-5xl font-serif italic text-center mb-20">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      {/* Same post list markup as PostList, but use `filtered` instead of `posts` */}
    </div>
  );
};

export default CategoryPage;