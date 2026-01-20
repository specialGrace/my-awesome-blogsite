import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CategoryPage from './components/CategoryPage';
import Footer from './components/Footer';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostEditor from './components/PostEditor';
import Login from './components/Login';
import { BlogContext } from './components/Context/BlogContext';import Header from './components/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  // ALL context values must be inside the component
  const { isAuthenticated, modalImage, setModalImage, showFullModal, setShowFullModal } = useContext(BlogContext);

  // Initialize AOS globally
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={isAuthenticated ? <PostEditor /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/edit/:id"
              element={isAuthenticated ? <PostEditor /> : <Navigate to="/login" />}
            />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
        </main>

        <Footer />

        {/* Global Modal - Rendered at the root level */}
       {modalImage && (
  <div
    className={`
      fixed inset-0 z-50 flex items-center justify-center 
      bg-gray/95 backdrop-blur-2xl transition-all duration-500
      ${modalImage ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}
    onClick={() => setModalImage(null)}
  >
    <div
      className={`
        relative max-w-[95vw] max-h-[92vh] p-4 sm:p-10 transition-all duration-500 ease-out
        ${modalImage ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={modalImage}
        alt="Enlarged view"
        className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
      />

      <button
        className="absolute -top-4 -right-4 sm:top-6 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg text-white text-4xl hover:bg-white/20 transition"
        onClick={() => setModalImage(null)}
      >
        ×
      </button>
    </div>
  </div>
)}

   {showFullModal && (
          <div
            className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-lg flex items-center justify-center"
            onClick={() => setShowFullModal(false)}
          >
            <div
              className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-[90%] max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-5 text-4xl text-gray-700 hover:text-black"
                onClick={() => setShowFullModal(false)}
              >
                ×
              </button>

              <div className="text-center py-6">
                <h2 className="text-4xl md:text-5xl font-serif italic text-pink-600 mb-6">
                  Welcome lovely human ♡
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                  This is a cozy space for style, travel, slow living & little joys.<br />
                  Make yourself at home, stay as long as you like.
                </p>

                <button
                  onClick={() => setShowFullModal(false)}
                  className="px-10 py-4 bg-pink-500 text-white font-medium rounded-full text-lg hover:bg-pink-600 transition"
                >
                  Continue → 
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;