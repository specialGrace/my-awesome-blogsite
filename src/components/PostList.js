import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from './Context/BlogContext';
import AOS from 'aos';
import im1 from './Images/im1.jpg';
import im2 from './Images/im2.jpg';
import look1 from './Images/out1.jpg';
import look2 from './Images/out2.jpg';
import look3 from './Images/out3.jpg';
import look4 from './Images/out4.jpg';
import look5 from './Images/out2.jpg';
import look6 from './Images/out4.jpg';

const PostList = () => {
  const { posts, setModalImage, showFullModal, setShowFullModal } = useContext(BlogContext);
  useEffect(() => {
    setShowFullModal(true);
       const hasSeenSession = sessionStorage.getItem('seenWelcomeSession');
    if (!hasSeenSession) {
      setShowFullModal(true);
      sessionStorage.setItem('seenWelcomeSession', 'true');
    }
  }, []);  

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

  const carouselRef = useRef(null);

const scrollContainer = (direction) => {
  if (!carouselRef.current) return;

  const scrollAmount = carouselRef.current.clientWidth * 0.8; 
  const currentScroll = carouselRef.current.scrollLeft;

  if (direction === 'left') {
    carouselRef.current.scrollTo({
      left: currentScroll - scrollAmount,
      behavior: 'smooth',
    });
  } else {
    carouselRef.current.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: 'smooth',
    });
  }
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
    <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24 max-w-6xl">
        {/* Welcome Hero */}
        <section className="mb-24 md:mb-40" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
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

<section className="mb-24 md:mb-40" data-aos="fade-up">
  <h2 className="text-3xl md:text-4xl font-serif italic text-center mb-12 md:mb-16">
    Recently on the Blog ♡
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
    {recentPosts.map((post) => (
      <article
        key={post.id}
        className="group bg-white/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-site-pink/10 flex flex-col h-full"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {post.featuredImage ? (
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
            <span className="text-6xl text-site-pink/40">♡</span>
          </div>
        )}

        <div className="p-6 md:p-7 flex flex-col flex-grow">
          <p className="text-text-muted italic text-sm mb-3">
            {formatDate(post.createdAt)}
          </p>
          <h3 className="text-xl md:text-2xl font-serif italic mb-4 group-hover:text-site-pink transition-colors line-clamp-2">
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h3>
          <p className="text-text-muted text-base leading-relaxed mb-5 line-clamp-3 flex-grow">
            {post.excerpt || post.content.slice(0, 120) + '...'}
          </p>
          <div className="mt-auto">
            <Link
              to={`/post/${post.id}`}
              className="text-site-pink font-medium hover:underline text-sm inline-flex items-center gap-2"
            >
              Read more →
            </Link>
          </div>
        </div>
      </article>
    ))}
  </div>
</section>

<section className="mb-24 md:mb-40" data-aos="fade-up">
  <h2 className="text-4xl md:text-5xl font-serif italic text-center mb-10 md:mb-14 text-text-dark">
    *my* Latest Looks ♡
  </h2>

  <div className="relative">
    <button
      onClick={() => scrollContainer('left')}
      className="
        absolute left-0 top-1/2 -translate-y-1/2 z-10
        bg-white/80 backdrop-blur-md text-pink-600 rounded-full p-3 shadow-lg
        hover:bg-white hover:scale-110 transition-all duration-300
        hidden md:flex items-center justify-center
      "
      aria-label="Scroll left"
    >
      ←
    </button>

    <div
      id="looks-carousel"
      ref={carouselRef}
      className="
        flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide
        scroll-smooth
      "
    >
      {latestLooks.map((look, i) => (
        <div
          key={i}
          className="
            group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl
            transition-all duration-500 ease-out cursor-pointer flex-shrink-0
            w-64 sm:w-72 md:w-80 lg:w-96 aspect-[4/5] sm:aspect-[3/4]
            bg-gradient-to-br from-pink-50/40 to-purple-50/30
            border border-white/50
            snap-center
          "
          data-aos="zoom-in"
          data-aos-delay={i * 100}
          onClick={() => setModalImage(look.src)}
        >
          <img
            src={look.src}
            alt={look.alt}
            className="
              w-full h-full object-cover transition-transform duration-700
              group-hover:scale-110 group-hover:rotate-[2deg]
            "
            loading={i < 4 ? 'eager' : 'lazy'}
          />

          {/* Overlay & Caption */}
          <div className="
            absolute inset-0 bg-gradient-to-t 
            from-black/65 via-black/20 to-transparent 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-500
          " />
          <div className="
            absolute inset-x-0 bottom-0 p-6 text-center text-white
            opacity-0 group-hover:opacity-100 transition-all duration-600
            translate-y-6 group-hover:translate-y-0
          ">
            <p className="text-base sm:text-lg font-light italic drop-shadow-lg">
              {look.caption}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Right Arrow */}
    <button
      onClick={() => scrollContainer('right')}
      className="
        absolute right-0 top-1/2 -translate-y-1/2 z-10
        bg-white/80 backdrop-blur-md text-pink-600 rounded-full p-3 shadow-lg
        hover:bg-white hover:scale-110 transition-all duration-300
        hidden md:flex items-center justify-center
      "
      aria-label="Scroll right"
    >
      →
    </button>

    {/* Scroll hint on mobile */}
    <p className="text-center text-text-muted italic mt-6 md:hidden">
      Swipe left/right to see more looks ♡
    </p>
  </div>

  <div className="text-center mt-12">
    <p className="text-text-muted italic text-lg">
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
    
  );
};

export default PostList;