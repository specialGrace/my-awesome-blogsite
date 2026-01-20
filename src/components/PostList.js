import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from './Context/BlogContext';
import AOS from 'aos';

// Images
import im1 from './Images/im1.jpg';
import im2 from './Images/im2.jpg';
import look1 from './Images/out1.jpg';
import look2 from './Images/out2.jpg';
import look3 from './Images/out3.jpg';
import look4 from './Images/out4.jpg';
import look5 from './Images/out2.jpg';
import look6 from './Images/out4.jpg';

const PostList = () => {
  const { posts } = useContext(BlogContext);
  const [modalImage, setModalImage] = useState(null); // For full-screen modal

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: true, offset: 100 });
  }, []);

  const sortedPosts = [...posts].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  const latestPost = sortedPosts[0];
  const recentPosts = sortedPosts.slice(1);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const latestLooks = [
    { src: look1, alt: 'Soft neutral coffee date outfit', caption: 'Coffee date softness' },
    { src: look2, alt: 'Golden hour flowy layers', caption: 'Golden hour layers' },
    { src: look3, alt: 'Romantic autumn midi dress', caption: 'Soft girl autumn' },
    { src: look4, alt: 'Weekend chic linen set', caption: 'Weekend elegance' },
    { src: look5, alt: 'Pastel office siren look', caption: 'Office siren vibes' },
    { src: look6, alt: 'Cozy knit + leather combo', caption: 'Winter romance' },
  ];

  return (
    <>
      {/* Full-page transparent modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer transition-opacity duration-500"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-5xl max-h-full p-8">
            <img
              src={modalImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
            />
            {/* Optional close button */}
            <button
              className="absolute top-4 right-4 text-white text-4xl opacity-70 hover:opacity-100"
              onClick={() => setModalImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24 max-w-6xl">
        {/* Welcome Hero */}
        <section className="mb-24 md:mb-40" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
            {/* Photos - Color normal → grayscale on hover */}
            <div className="order-2 md:order-1 relative h-96 md:h-[42rem] flex justify-center md:justify-end group" data-aos="fade-right" data-aos-delay="200">
              <img
                src={im1}
                alt="Grace photo 1"
                className="absolute bottom-0 left-6 sm:left-12 md:left-20 lg:left-32 w-64 sm:w-72 md:w-80 lg:w-96 rounded-3xl shadow-2xl object-cover border-8 border-site-pink/20 
                           rotate-[-8deg]
                           transition-all duration-800 ease-out group-hover:grayscale
                           group-hover:rotate-[-4deg] group-hover:-translate-x-8 group-hover:-translate-y-8 group-hover:scale-105 cursor-pointer"
                onClick={() => setModalImage(im1)}
                loading="lazy"
              />

              <img
                src={im2}
                alt="Grace photo 2"
                className="absolute top-0 right-6 sm:right-12 md:right-20 lg:right-32 w-64 sm:w-72 md:w-80 lg:w-96 rounded-3xl shadow-2xl object-cover border-8 border-site-pink/20 
                           rotate-[8deg] z-10
                           transition-all duration-800 ease-out group-hover:grayscale
                           group-hover:rotate-[4deg] group-hover:translate-x-8 group-hover:translate-y-8 group-hover:scale-105 cursor-pointer"
                onClick={() => setModalImage(im2)}
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div className="order-1 md:order-2 text-center md:text-left" data-aos="fade-left" data-aos-delay="400">
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-serif italic mb-6 md:mb-8 text-text-dark leading-tight">
                Helping you create a wardrobe you love …<br className="hidden md:block" />
                and live more beautifully ♡
              </h1>
              <p className="text-lg md:text-xl text-text-muted leading-relaxed font-light max-w-xl mx-auto md:mx-0">
                Hi, friend! I'm Grace. if you love looking your best but believe experiences are more 
                valuable than things, then you’re in the right place! Sharing style inspiration, travel 
                stories, everyday mindfulness, and little joys that make life prettier. <em>*and*</em> elevated. 
                Grab a coffee and stay a while.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Latest Post */}
        {latestPost && (
          <section className="mb-24 md:mb-40" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-serif italic text-center mb-10 md:mb-16">
              *the* Latest
            </h2>
            <Link to={`/post/${latestPost.id}`} className="block group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-700">
                {latestPost.featuredImage ? (
                  <img
                    src={latestPost.featuredImage}
                    alt={latestPost.title}
                    className="w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/9] lg:aspect-[21/9] object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                    loading="eager"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalImage(latestPost.featuredImage);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <div className="bg-site-beige/40 aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/9] flex items-center justify-center">
                    <span className="text-6xl md:text-8xl text-site-pink/60">♡</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-700" />

                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 md:p-16 lg:p-20 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <p className="text-base sm:text-lg md:text-xl italic mb-3 md:mb-4 opacity-90 font-light">
                    {formatDate(latestPost.createdAt)}
                  </p>
                  <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic leading-tight tracking-tight">
                    {latestPost.title}
                  </h3>
                  <div className="mt-6 md:mt-8 inline-block px-7 py-3.5 bg-white/10 backdrop-blur border border-white/20 rounded-full hover:bg-white/20 transition">
                    Read this story →
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Recent Posts - Images also open in modal + grayscale on hover */}
        {recentPosts.length > 0 && (
          <section className="mb-24 md:mb-40" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-serif italic text-center mb-16 md:mb-20">
              Recently *on the* Blog
            </h2>
            <div className="space-y-20 md:space-y-32">
              {recentPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay="200"
                >
                  {post.featuredImage && (
                    <div className={`overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-700 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-64 md:h-80 lg:h-96 object-cover hover:grayscale hover:scale-105 transition-all duration-800 cursor-pointer"
                        loading="lazy"
                        onClick={() => setModalImage(post.featuredImage)}
                      />
                    </div>
                  )}

                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <p className="text-text-muted italic mb-4 text-center md:text-left">
                      {formatDate(post.createdAt)}
                    </p>
                    <Link to={`/post/${post.id}`}>
                      <h3 className="text-3xl md:text-4xl font-serif italic hover:text-site-pink transition-colors mb-5 text-center md:text-left leading-tight">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-lg text-text-muted leading-relaxed text-center md:text-left mb-6">
                      {post.excerpt}
                    </p>
                    <Link to={`/post/${post.id}`} className="inline-block text-site-pink text-lg font-medium hover:underline">
                      Continue reading →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="text-center mb-24 md:mb-40" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-serif italic mb-10 md:mb-12">
            Browse *by* Category
          </h2>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-lg md:text-xl">
            {['Style', 'Travel', 'Life', 'Home'].map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                className="hover:text-site-pink transition-colors duration-500"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Looks - Clickable + grayscale on hover */}
        <section className="mb-20 md:mb-32" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-serif italic text-center mb-10 md:mb-12">
            *my* Latest Looks
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 md:gap-7">
            {latestLooks.map((look, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 aspect-square cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={i * 100}
                onClick={() => setModalImage(look.src)}
              >
                <img
                  src={look.src}
                  alt={look.alt}
                  className="w-full h-full object-cover group-hover:grayscale transition-all duration-800 group-hover:scale-110"
                  loading={i < 4 ? 'eager' : 'lazy'}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-600 translate-y-4 group-hover:translate-y-0">
                  <p className="text-xs sm:text-sm font-light italic drop-shadow-md">
                    {look.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 md:mt-12">
            <p className="text-text-muted italic text-lg mb-4">
              Want to shop these looks? LTK + Amazon links coming soon ♡
            </p>
          </div>
        </section>

        {posts.length === 0 && (
          <p className="text-center text-2xl md:text-3xl text-text-muted py-32" data-aos="fade-up">
            No stories yet... let's create some magic together! ♡
          </p>
        )}
      </div>
    </>
  );
};

export default PostList;