import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import team1 from '../assets/img/team-1.jpg';
import team2 from '../assets/img/team-2.jpg';
import team3 from '../assets/img/team-3.jpg';
import team4 from '../assets/img/team-4.jpg';

const BarberCard = ({ image, name, role }) => (
  <div className="group relative overflow-hidden rounded-2xl">
    <div className="aspect-[4/5] relative">
      <img 
        src={image} 
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 sm:group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-[#D4B86A] text-xl sm:text-2xl font-bold mb-1">{name}</h3>
        <p className="text-gray-300 mb-2 sm:mb-4">{role}</p>
        <div className="flex gap-2 sm:gap-4">
          <a href="/" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#D4B86A] flex items-center justify-center text-[#D4B86A] hover:bg-[#D4B86A] hover:text-black transition-colors duration-300">
            <FaFacebookF className="text-xs sm:text-sm" />
          </a>
          <a href="/" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#D4B86A] flex items-center justify-center text-[#D4B86A] hover:bg-[#D4B86A] hover:text-black transition-colors duration-300">
            <FaTwitter className="text-xs sm:text-sm" />
          </a>
          <a href="/" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#D4B86A] flex items-center justify-center text-[#D4B86A] hover:bg-[#D4B86A] hover:text-black transition-colors duration-300">
            <FaInstagram className="text-xs sm:text-sm" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

const Barber = () => {
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
    <div className="py-8 sm:py-12 bg-[#0d0f15] relative overflow-hidden h-[470px]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4B86A]/5 to-transparent opacity-60" />
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#D4B86A] mb-2">
            Our Expert Team
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-2">
            Meet our talented team of professional stylists and grooming experts
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full lg:w-11/12 mx-auto">
          {barbers.map((barber, index) => (
            <div key={index} className="w-full">
              <BarberCard {...barber} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Barber;