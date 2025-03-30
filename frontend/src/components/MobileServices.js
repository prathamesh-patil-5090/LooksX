import React from 'react';
import { GiScissors, GiBeard, GiRazor, GiFaceToFace } from 'react-icons/gi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ServiceCard = ({ title, description, icon: Icon, includes }) => (
  <div className="relative p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-gray-800 h-[578px] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#D4B86A]/10 to-[#B89B5D]/10"></div>
    <div className="relative z-10 flex flex-col items-center text-center w-full">
      <div className="w-20 h-20 bg-gradient-to-br from-[#D4B86A] to-[#B89B5D] rounded-lg flex items-center justify-center mb-6">
        <Icon className="text-3xl text-black" />
      </div>
      <h3 className="text-3xl font-bold text-[#D4B86A] mb-4">{title}</h3>
      <p className="text-gray-300 text-base px-4 mb-8">{description}</p>
      
      <div className="border-t border-[#D4B86A]/30 w-24 my-6"></div>
      
      <div className="bg-black/20 p-4 rounded-lg w-full max-w-xs">
        <h4 className="text-[#D4B86A] text-lg mb-2">Includes:</h4>
        <ul className="text-gray-300 text-sm text-left pl-4 space-y-2">
          {includes.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-[#D4B86A] mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const MobileServices = () => {
  const services = [
    {
      title: "Signature Styling",
      description: "Experience transformative haircuts and styling from our master artists.",
      icon: GiScissors,
      includes: [
        "Professional consultation",
        "Premium styling products",
        "Blow-dry & finish"
      ]
    },
    {
      title: "Precision Grooming",
      description: "Meticulous beard sculpting and trimming services that define your features.",
      icon: GiBeard,
      includes: [
        "Beard consultation",
        "Hot towel treatment",
        "Beard oil application"
      ]
    },
    {
      title: "Luxury Treatments",
      description: "Indulge in our premium grooming treatments and hot towel services.",
      icon: GiRazor,
      includes: [
        "Deep cleansing ritual",
        "Rejuvenating massage",
        "Premium aromatherapy"
      ]
    },
    {
      title: "Wellness Rituals",
      description: "Therapeutic spa treatments designed to refresh and revitalize.",
      icon: GiFaceToFace,
      includes: [
        "Healing spa experience",
        "Stress relief techniques",
        "Organic skincare products"
      ]
    }
  ];

  return (
    <div className="py-10 min-h-screen bg-[#0d0f15] relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4B86A]/5 to-transparent opacity-60"></div>
      <div className="container mx-auto px-4 py-6 relative flex-1 flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#D4B86A] mb-2">
            Premium Services
          </h1>
          <p className="text-base text-gray-400 max-w-xs mx-auto px-2">
            Discover our extensive range of luxury salon services
          </p>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-full py-4"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <ServiceCard {...service} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MobileServices;
