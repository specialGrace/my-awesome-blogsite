import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CategoryPage from './components/CategoryPage';
import Footer from './components/Footer';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostEditor from './components/PostEditor';
import Login from './components/Login';
import { BlogContext } from './components/Context/BlogContext';
import Header from './components/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const { isAuthenticated, modalImage, setModalImage, showFullModal, setShowFullModal } = useContext(BlogContext);

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


      {/* Main content — REMOVE bg-gray-50 so body/gradient shows through */}
      <div className="min-h-screen flex flex-col relative z-0">
        <Header />

        <main className="flex-grow relative z-10">
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
        {/* <div
  className="
    fixed inset-0 z-[-1]
    backdrop-blur-xl lg:backdrop-blur-2xl
    pointer-events-none
  "
/> */}

        {/* Your image modal — unchanged but with consistent dark overlay */}
        {modalImage && (
          <div
            className="
              fixed inset-0 z-50 flex items-center justify-center
              bg-black/50 backdrop-blur-2xl     // darker for consistency
            "
            onClick={() => setModalImage(null)}
          >
            <div
              className="
                relative bg-black/20 backdrop-blur-xl 
                border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl
                max-w-[95vw] max-h-[90vh]
              "
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={modalImage}
                alt="Enlarged view"
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <button
                className="absolute top-4 right-4 text-white text-5xl hover:scale-110 transition"
                onClick={() => setModalImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Welcome modal — unchanged */}
        {showFullModal && (
          <div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setShowFullModal(false)}
          >
            <div
              className="relative bg-black/30 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-[90%] max-h-[85vh] overflow-y-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-5 text-4xl text-white hover:text-gray-300"
                onClick={() => setShowFullModal(false)}
              >
                ×
              </button>

              <div className="text-center py-6 text-white">
                <h2 className="text-4xl md:text-5xl font-serif italic text-pink-400 mb-6">
                  Welcome lovely human ♡
                </h2>
                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  This is a cozy space for style, travel, slow living & little joys.<br />
                  Make yourself at home, stay as long as you like.
                </p>

                <button
                  onClick={() => setShowFullModal(false)}
                  className="px-10 py-4 bg-pink-600 text-white font-medium rounded-full text-lg hover:bg-pink-700 transition"
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