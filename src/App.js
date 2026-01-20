import React, { useEffect, useContext } from 'react'; // Import hooks here
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
  const { isAuthenticated } = useContext(BlogContext);

  // Initialize AOS here — inside the component
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
      <div className="min-h-screen flex flex-col bg-white"> {/* Changed to bg-white to match your current feminine/minimalist style */}
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
      </div>
    </Router>
  );
}

export default App;