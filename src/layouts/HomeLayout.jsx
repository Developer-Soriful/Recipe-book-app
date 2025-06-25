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

      {/* Featured Authors Section */}
      <section className="py-16 bg-gradient-to-r ">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Authors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "J.K. Rowling",
                image: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2076&auto=format&fit=crop",
                genre: "Fantasy Fiction",
                books: "Harry Potter Series",
                quote: "It is our choices that show what we truly are, far more than our abilities."
              },
              {
                name: "Stephen King",
                image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2080&auto=format&fit=crop",
                genre: "Horror & Thriller",
                books: "The Shining, IT",
                quote: "Books are a uniquely portable magic."
              },
              {
                name: "Agatha Christie",
                image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop",
                genre: "Mystery",
                books: "Murder on the Orient Express",
                quote: "The best time for planning a book is while you're doing the dishes."
              }
            ].map((author, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative h-80">
                  <img 
                    src={author.image} 
                    alt={author.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <FaQuoteLeft className="text-4xl mb-4 opacity-50" />
                      <p className="text-lg italic mb-4">{author.quote}</p>
                      <div className="border-t border-white/20 pt-4">
                        <h3 className="text-2xl font-bold mb-2">{author.name}</h3>
                        <p className="text-white/80 mb-1">{author.genre}</p>
                        <p className="text-white/60">{author.books}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeLayout;
