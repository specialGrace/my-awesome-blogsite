import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BlogContext } from './Context/BlogContext';  // ← your context file

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, deletePost, isAuthenticated } = React.useContext(BlogContext);

  const post = posts.find(p => p.id === Number(id));

  if (!post) return <p className="text-center">Post not found.</p>;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post.id);
      navigate('/');
    }
  };

return (
  <article className="container mx-auto px-6 py-16 md:py-24 max-w-4xl prose prose-lg prose-headings:font-serif prose-headings:text-text-dark prose-a:text-site-pink hover:prose-a:underline">
    {post.featuredImage && (
  <div className="mb-16 -mx-6 md:-mx-12 overflow-hidden">
    <img 
      src={post.featuredImage} 
      alt={post.title}
      className="w-full max-h-screen object-cover"
    />
  </div>
)}
    <header className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-6 leading-tight">
        {post.title}
      </h1>
   <p className="text-text-muted italic mb-6">
  {new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })}
</p>
    </header>

    <div className="prose-headings:text-text-dark prose-headings:font-serif prose-p:text-text-muted prose-p:leading-relaxed max-w-none">
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>

    {isAuthenticated && (
      <div className="mt-16 pt-10 border-t border-site-pink/30 flex justify-center gap-12 text-lg">
        <Link to={`/admin/edit/${post.id}`} className="text-site-pink hover:underline">
          Edit Post
        </Link>
        <button onClick={handleDelete} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>
    )}
  </article>
);
};

export default PostDetail;