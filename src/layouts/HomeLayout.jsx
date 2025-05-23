import React, { useContext, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Autoplay } from 'swiper/modules'; // ✅ import Autoplay
import TopRecipe from '../pages/TopRecipe';
import { Link, useLoaderData } from 'react-router';

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
      <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10'>
        <TopRecipe toprecipe={toprecipe} />
      </main>
      <div className='my-5'>
        <Link to={`/allrecipes`}>
          <button className="btn btn-outline btn-primary">ALL Recipes</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeLayout;
