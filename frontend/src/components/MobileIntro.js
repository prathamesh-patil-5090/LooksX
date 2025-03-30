import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import beard1 from "../assets/img/service-6.jpg";
import beard2 from "../assets/img/service-8.jpg";
import beard3 from "../assets/img/service-1.jpg";
import { FaRegClock, FaStar } from 'react-icons/fa';

const ImageCard = ({ img, title, description, price, rating, specialFeature }) => (
  <div className="relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-sm border border-gray-800">
    <img src={img} alt={title} className="w-full h-[60%] object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <h3 className="text-[#D4B86A] text-lg font-bold mb-1">{title}</h3>
      <p className="text-gray-300 text-sm mb-2">{description}</p>
      <div className="flex items-center justify-between mb-2">
        <div className="bg-[#D4B86A]/20 px-3 py-1 rounded-full">
          <span className="text-[#D4B86A] text-sm font-medium">₹{price}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaStar className="text-[#D4B86A] text-xs" />
          <span className="text-gray-300 text-xs">{rating}/5</span>
        </div>
      </div>
      <div className="text-xs text-gray-400 flex items-start gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#D4B86A] flex-shrink-0 mt-[0.4rem]" />
        {specialFeature}
      </div>
    </div>
  </div>
);

const MobileIntro = () => {
  const navigate = useNavigate();
  const styleData = [
    {
      img: beard1,
      title: "Premium Haircuts",
      description: "Expert styling for modern looks",
      price: "499",
      rating: "4.9",
      specialFeature: "Complimentary head massage with every haircut"
    },
    {
      img: beard2,
      title: "Beard Grooming",
      description: "Precision trimming & shaping",
      price: "399",
      rating: "4.8",
      specialFeature: "Hot towel treatment included with premium service"
    },
    {
      img: beard3,
      title: "Luxury Package",
      description: "Complete transformation",
      price: "1999",
      rating: "5.0",
      specialFeature: "Includes haircut, beard styling, facial & hair spa"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d0f15] relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4B86A]/5 to-transparent opacity-60" />
      
      <div className="container mx-auto px-4 py-6 relative flex-1 flex flex-col">
        <div className="text-center mb-8">
          <h3 className="text-[#D4B86A] text-base font-medium mb-1">Welcome to</h3>
          <h1 className="text-3xl font-extrabold text-white mb-1">LooksX Fashion</h1>
          <h2 className="text-[#D4B86A] text-xl mb-2">Premium Style Services</h2>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Autoplay, Pagination]}
            spaceBetween={20}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#D4B86A]'
            }}
            className="w-full max-w-[300px] mx-auto h-[400px]"
          >
            {styleData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="px-1">
                  <ImageCard {...item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="text-center mt-8">
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs mx-auto px-2">
              Discover the art of personal transformation at LooksX. We blend contemporary 
              fashion with personalized styling to create your signature look.
            </p>
            <button 
              onClick={() => navigate('/services')}
              className="bg-gradient-to-r from-[#D4B86A] to-[#B89B5D] text-black py-2 px-6 rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileIntro;
