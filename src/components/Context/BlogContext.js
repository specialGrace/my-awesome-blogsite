// BlogContext.jsx  (or wherever BlogProvider lives)

import React, { createContext, useState, useEffect } from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [modalImage, setModalImage] = useState(null);           // ← your existing image modal
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // NEW: for full-page overlay / welcome modal
  const [showFullModal, setShowFullModal] = useState(false);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    setPosts(storedPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => setPosts([...posts, { 
    ...post, 
    id: Date.now(), 
    createdAt: Date.now() 
  }]);

  const updatePost = (updatedPost) => {
    setPosts(posts.map(p => p.id === updatedPost.id 
      ? { ...updatedPost, createdAt: p.createdAt }
      : p
    ));
  };

  const deletePost = (id) => setPosts(posts.filter(p => p.id !== id));

  const login = (password) => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    }
  };

  const logout = () => setIsAuthenticated(false);

  return (
    <BlogContext.Provider value={{
      posts, addPost, updatePost, deletePost,
      isAuthenticated, login, logout,
      modalImage, setModalImage,              // ← old image one
      showFullModal, setShowFullModal         // ← new full-page one
    }}>
      {children}
    </BlogContext.Provider>
  );
};