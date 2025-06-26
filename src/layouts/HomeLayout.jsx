import React, { useContext, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Autoplay } from 'swiper/modules'; // ✅ import Autoplay
import TopRecipe from '../pages/TopRecipe';
import { Link, useLoaderData } from 'react-router';
import { FaBook, FaUsers, FaAward, FaHeart, FaQuoteLeft } from 'react-icons/fa';

const HomeLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const toprecipe = useLoaderData()
  if (loading) {
    return <div className='min-h-screen flex justify-center items-center'>
      <span className="loading loading-ring loading-xl"></span>
    </div>
  }

  return (
    <div className='w-full'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        pagination={{ dynamicBullets: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }} // ✅ autoplay settings
        modules={[Pagination, Autoplay]} // ✅ include Autoplay module
        className="mySwiper w-full max-h-[50vh] bg-center bg-cover object-fill"
      >
        <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1616405160919-c209d0062a4a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://plus.unsplash.com/premium_photo-1731987866995-493112a978e0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.unsplash.com/photo-1634608341072-27cd7beae1b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
      </Swiper>

      {/* Featured Categories Section */}

     <div className='my-10 text-2xl font-semibold'>
      <p>Top Recipes</p>
     </div>
      <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-10'>
        <TopRecipe toprecipe={toprecipe} />
      </main>
      <div className='my-5'>
        <Link to={`/allrecipes`}>
          <button className="btn btn-outline btn-primary">ALL Recipes</button>
        </Link>
      </div>
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Fiction',
                image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
                count: '500+ Books'
              },
              {
                title: 'Non-Fiction',
                image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop',
                count: '300+ Books'
              },
              {
                title: 'Biography',
                image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2076&auto=format&fit=crop',
                count: '200+ Books'
              },
              {
                title: 'Self-Help',
                image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2080&auto=format&fit=crop',
                count: '150+ Books'
              }
            ].map((category, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <img src={category.image} alt={category.title} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-white/80">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {[
              {
                icon: <FaBook className=" w-12 h-12" />,
                title: 'Vast Collection',
                description: 'Access thousands of books across various genres and categories.'
              },
              {
                icon: <FaUsers className="w-12 h-12" />,
                title: 'Reader Community',
                description: 'Join our community of book lovers and share your reading journey.'
              },
              {
                icon: <FaAward className="w-12 h-12" />,
                title: 'Quality Content',
                description: 'Carefully curated books from renowned authors and publishers.'
              },
              {
                icon: <FaHeart className="w-12 h-12" />,
                title: 'Personalized Experience',
                description: 'Get book recommendations tailored to your reading preferences.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg  hover:bg-primary hover:text-white transition-all duration-300">
                <div className="flex justify-center mb-4 text-primary group-hover:text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className=" group-hover:text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Blog/Spotlight Section */}
      <section className="py-16 my-14 rounded-3xl shadow-2xl bg-gradient-to-br from-white via-orange-50 to-yellow-50 border border-orange-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col items-center mb-2">
            <span className="inline-block mb-2 h-2 w-16 rounded-full bg-gradient-to-r from-orange-300 to-yellow-300 dark:from-yellow-700 dark:to-orange-700"></span>
            <h2 className="text-4xl font-extrabold text-center mb-6 tracking-tight text-gray-900 dark:text-white">Top 3 Recipes Spotlight <span className='ml-2 inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full dark:bg-yellow-900 dark:text-yellow-200'>Top Rated</span></h2>
          </div>
          <p className="text-center text-lg mb-12 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">Check out the most loved recipes from our community! Discover, cook, and enjoy these trending dishes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array.isArray(toprecipe) && toprecipe.slice(0, 3).map(recipe => (
              <div key={recipe._id} className="bg-white rounded-2xl shadow-lg border border-orange-100 p-5 flex flex-col items-center hover:scale-105 transition-transform duration-200 dark:bg-gray-800 dark:border-gray-700">
                <img src={recipe.photo} alt={recipe.title} className="w-24 h-24 object-cover rounded-full border-4 border-orange-50 mb-4 shadow dark:border-gray-700" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 text-center">{recipe.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Cuisine: <span className="font-semibold">{recipe.cuisine}</span></p>
                <div className="flex items-center gap-1 text-sm mb-2">
                  <FaHeart className="w-4 h-4 text-orange-300 dark:text-yellow-400" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{recipe.likeCount}</span> <span className="dark:text-gray-300">Likes</span>
                </div>
                <Link to={`/users/${recipe._id}`} className="mt-auto text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold py-1 px-3 rounded-full flex items-center gap-2 transition dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-yellow-200 dark:border dark:border-gray-700">
                  View Details <span>&rarr;</span>
                </Link>
              </div>
            ))}
            {(!Array.isArray(toprecipe) || toprecipe.length === 0) && (
              <div className="col-span-full text-center text-gray-400 py-8 dark:text-gray-500">No top recipes found.</div>
            )}
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section className="relative py-16 my-14 flex justify-center items-center overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white via-orange-50 to-yellow-50 border border-orange-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:border-gray-800">
        {/* Decorative SVG Wave */}
        <svg className="absolute top-0 left-0 w-full h-8 text-orange-100 dark:text-gray-800" viewBox="0 0 1440 320"><path fill="currentColor" fillOpacity="1" d="M0,64L48,74.7C96,85,192,107,288,128C384,149,480,171,576,154.7C672,139,768,85,864,80C960,75,1056,117,1152,133.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 relative z-10 max-w-4xl">
          {/* Illustration + Badge */}
          <div className="flex-1 flex flex-col items-center md:items-end mb-8 md:mb-0">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=320&q=80" alt="Newsletter Food" className="w-40 h-40 object-cover rounded-full border-4 border-orange-50 shadow-2xl bg-white dark:bg-gray-800 dark:border-gray-700" />
              <span className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-200 to-yellow-200 text-gray-800 text-xs font-bold px-4 py-1 rounded-full shadow-lg animate-bounce dark:from-yellow-700 dark:to-pink-700 dark:text-white">NEW</span>
            </div>
            <span className="mt-4 inline-block bg-white/80 text-gray-800 font-semibold px-4 py-1 rounded-full shadow border border-orange-50 text-sm dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">Join 5,000+ foodies!</span>
          </div>
          {/* Content + Glassmorphism Form */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center md:items-start mb-2">
              <span className="inline-block mb-2 h-2 w-16 rounded-full bg-gradient-to-r from-orange-300 to-yellow-300 dark:from-yellow-700 dark:to-orange-700"></span>
              <h2 className="text-4xl font-extrabold mb-3 text-gray-900 dark:text-white tracking-tight">Subscribe to Our Foodie Newsletter</h2>
            </div>
            <p className="text-lg mb-7 text-gray-700 max-w-lg dark:text-gray-300">Get the latest recipes, kitchen tips, and exclusive offers delivered straight to your inbox. Stay updated with real-time news and trends from the world of food!</p>
            <form className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row gap-3 border border-orange-50 dark:bg-gray-800/80 dark:border-gray-700">
              <input type="email" required placeholder="Enter your email" className="input input-bordered w-full sm:w-64 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white/90 dark:bg-gray-700 dark:text-gray-200" />
              <button type="submit" className="btn btn-primary rounded-full px-8 py-3 font-bold text-lg shadow-xl flex items-center gap-2 hover:bg-orange-400 transition-colors duration-200 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-gray-900">
                Subscribe <span>&rarr;</span>
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3 dark:text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
      {/* Offer Section */}
      <section className="relative py-16 my-14 rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-white via-orange-50 to-yellow-50 border border-orange-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:border-gray-800">
        {/* Decorative Food Image (top right) */}
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" alt="Delicious Food" className="hidden md:block absolute top-0 right-0 w-56 opacity-20 pointer-events-none select-none rounded-bl-3xl" />
        {/* Limited Time Badge */}
        <div className="absolute left-6 top-6">
          <span className="inline-block bg-gradient-to-r from-orange-200 to-yellow-200 text-gray-800 text-xs font-bold px-4 py-1 rounded-full shadow-lg animate-pulse dark:from-yellow-700 dark:to-pink-700 dark:text-white">LIMITED TIME OFFER</span>
        </div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10 max-w-4xl">
          {/* Offer Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start mb-2">
              <span className="inline-block mb-2 h-2 w-16 rounded-full bg-gradient-to-r from-orange-300 to-yellow-300 dark:from-yellow-700 dark:to-orange-700"></span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight">Unlock Premium Recipes & Features!</h2>
            </div>
            <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto md:mx-0 text-gray-700 dark:text-gray-300">Join <span className="font-bold">My Recipe Book</span> today and get <span className="font-bold">1 month FREE</span> access to:</p>
            <ul className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto md:mx-0">
              <li className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm border border-orange-50 dark:bg-gray-800 dark:border-gray-700"><FaBook className="text-orange-300 text-2xl dark:text-yellow-400" /> <span className="text-gray-800 dark:text-gray-200">Exclusive premium recipes</span></li>
              <li className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm border border-orange-50 dark:bg-gray-800 dark:border-gray-700"><FaUsers className="text-orange-300 text-2xl dark:text-pink-300" /> <span className="text-gray-800 dark:text-gray-200">Join a vibrant foodie community</span></li>
              <li className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm border border-orange-50 dark:bg-gray-800 dark:border-gray-700"><FaHeart className="text-orange-300 text-2xl dark:text-yellow-400" /> <span className="text-gray-800 dark:text-gray-200">Like, save & manage your own recipes</span></li>
              <li className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm border border-orange-50 dark:bg-gray-800 dark:border-gray-700"><FaAward className="text-yellow-400 text-2xl dark:text-yellow-400" /> <span className="text-gray-800 dark:text-gray-200">Personalized recommendations</span></li>
            </ul>
            <Link to={user ? "/profile" : "/signup"}>
              <button className="btn btn-primary btn-lg px-8 py-3 text-lg font-bold shadow-xl flex items-center gap-2 hover:scale-105 hover:bg-orange-400 transition-transform duration-200 border-2 border-orange-200 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-gray-900 dark:border-gray-700">
                {user ? "Go to Profile" : "Claim Your Free Month"} <span>&rarr;</span>
              </button>
            </Link>
          </div>
          {/* Decorative Illustration (bottom left) */}
          <div className="flex-1 flex justify-center md:justify-end items-end">
            <img src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=350&q=80" alt="Recipe Book" className="w-64 rounded-2xl shadow-lg border-4 border-orange-50 object-cover dark:border-gray-700" />
          </div>
        </div>
      </section>
      {/* Promotional Section: Refer a Friend */}
      <section className="relative py-14 my-14 rounded-3xl shadow-xl bg-gradient-to-br from-yellow-50 via-orange-50 to-white border border-orange-100 flex flex-col md:flex-row items-center gap-10 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:border-gray-800">
        {/* Illustration */}
        <div className="flex-1 flex justify-center md:justify-end mb-6 md:mb-0">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=350&q=80" alt="Refer a Friend" className="w-48 h-48 object-cover rounded-2xl border-4 border-orange-50 shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700" />
        </div>
        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start mb-2">
            <span className="inline-block mb-2 h-2 w-16 rounded-full bg-gradient-to-r from-orange-300 to-yellow-300 dark:from-yellow-700 dark:to-orange-700"></span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900 dark:text-white tracking-tight">Refer a Friend &amp; Get Rewards! <span className='ml-2 inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full dark:bg-yellow-900 dark:text-yellow-200'>Bonus</span></h2>
          </div>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 max-w-lg mx-auto md:mx-0">Invite your friends to join My Recipe Book and both of you will receive exclusive access to premium recipes and special badges. Share the love of cooking and grow our foodie community together!</p>
          {/* Instead of an unclickable button, show a badge or info text */}
          <span className="inline-block bg-gradient-to-r from-orange-200 to-yellow-200 text-gray-800 text-sm font-semibold px-5 py-2 rounded-full shadow dark:from-yellow-700 dark:to-pink-700 dark:text-white">Share your referral link from your profile page!</span>
        </div>
      </section>

     

    </div>
  );
};

export default HomeLayout;
