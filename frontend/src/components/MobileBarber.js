import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import team1 from '../assets/img/team-1.jpg';
import team2 from '../assets/img/team-2.jpg';
import team3 from '../assets/img/team-3.jpg';
import team4 from '../assets/img/team-4.jpg';

const BarberCard = ({ image, name, role }) => (
  <div className="relative overflow-hidden rounded-xl">
    <div className="aspect-[3/4] relative">
      <img 
        src={image} 
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-[#D4B86A] text-xl font-bold mb-1">{name}</h3>
        <p className="text-gray-300 mb-2">{role}</p>
        <div className="flex gap-2">
          <a href="/" className="w-8 h-8 rounded-full border border-[#D4B86A] flex items-center justify-center text-[#D4B86A] hover:bg-[#D4B86A] hover:text-black transition-colors duration-300">
            <FaFacebookF className="text-xs" />
          </a>
          <a href="/" className="w-8 h-8 rounded-full border border-[#D4B86A] flex items-center justify-center text-[#D4B86A] hover:bg-[#D4B86A] hover:text-black transition-colors duration-300">
            <FaTwitter className="text-xs" />
          </a>
          <a href="/" className="w-8 h-8 rounded-full border border-[#D4B86A] flex items-center justify-center text-[#D4B86A] hover:bg-[#D4B86A] hover:text-black transition-colors duration-300">
            <FaInstagram className="text-xs" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

const MobileBarber = () => {
  const barbers = [
    {
      name: "James Wilson",
      role: "Master Barber",
      image: team1
    },
    {
      name: "Michael Brown",
      role: "Hair Specialist",
      image: team2
    },
    {
      name: "David Clark",
      role: "Color Expert",
      image: team3
    },
    {
      name: "Robert Martinez",
      role: "Beard Specialist",
      image: team4
    }
  ];

  return (
    <div className="py-10 min-h-screen bg-[#0d0f15] relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4B86A]/5 to-transparent opacity-60" />
      
      <div className="container mx-auto px-4 py-6 relative flex-1 flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#D4B86A] mb-2">
            Our Expert Team
          </h2>
          <p className="text-base text-gray-400 max-w-xs mx-auto px-2">
            Meet our talented team of professional stylists and grooming experts
          </p>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
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
            className="w-full py-4"
          >
            {barbers.map((barber, index) => (
              <SwiperSlide key={index}>
                <div className="px-1">
                  <BarberCard {...barber} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MobileBarber;