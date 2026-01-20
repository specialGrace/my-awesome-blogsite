import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogContext } from './Context/BlogContext';

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, addPost, updatePost } = React.useContext(BlogContext);
  const existingPost = id ? posts.find(p => p.id === parseInt(id)) : null;

  const [title, setTitle] = useState(existingPost?.title || '');
  const [content, setContent] = useState(existingPost?.content || '');
  const [excerpt, setExcerpt] = useState(existingPost?.excerpt || '');
const [featuredImage, setFeaturedImage] = useState(existingPost?.featuredImage || '');
const [category, setCategory] = useState(existingPost?.category || 'Life'); // we'll use this next
  const handleSubmit = (e) => {
    e.preventDefault();
const post = { title, content, excerpt, featuredImage, category };    if (id) {
      updatePost({ ...post, id: parseInt(id) });
    } else {
      addPost(post);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Post' : 'Create Post'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Excerpt (short summary)"
        value={excerpt}
        onChange={e => setExcerpt(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
  type="url"
  placeholder="Featured Image URL (e.g. Unsplash link)"
  value={featuredImage}
  onChange={(e) => setFeaturedImage(e.target.value)}
  className="w-full p-2 mb-4 border border-site-pink/30 rounded focus:border-site-pink"
/>

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full p-2 mb-6 border border-site-pink/30 rounded"
>
  <option value="Style">Style</option>
  <option value="Travel">Travel</option>
  <option value="Life">Life</option>
  <option value="Home">Home</option>
</select>
      <textarea
        placeholder="Content (Markdown supported)"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded h-40"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default PostEditor;