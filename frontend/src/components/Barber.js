import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import team1 from '../assets/img/team-1.jpg';
import team2 from '../assets/img/team-2.jpg';
import team3 from '../assets/img/team-3.jpg';
import team4 from '../assets/img/team-4.jpg';

const BarberCard = ({ image, name, role }) => (
  <div className="group relative overflow-hidden rounded-2xl">
    <div className="aspect-[3/4] relative">
      <img 
        src={image} 
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-[#D4B86A] text-2xl font-bold mb-1">{name}</h3>
        <p className="text-gray-300 mb-4">{role}</p>
        <div className="flex gap-4">
          <a href="/" className="w-10 h-10 rounded-full border border-[#D4B86A] flex items-center justify-center text-[#D4B86A] hover:bg-[#D4B86A] hover:text-black transition-colors duration-300">
            <FaFacebookF />
          </a>
          <a href="/" className="w-10 h-10 rounded-full border border-[#D4B86A] flex items-center justify-center text-[#D4B86A] hover:bg-[#D4B86A] hover:text-black transition-colors duration-300">
            <FaTwitter />
          </a>
          <a href="/" className="w-10 h-10 rounded-full border border-[#D4B86A] flex items-center justify-center text-[#D4B86A] hover:bg-[#D4B86A] hover:text-black transition-colors duration-300">
            <FaInstagram />
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
    <div className="pt-20 min-h-screen bg-[#0d0f15] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4B86A]/5 to-transparent opacity-60" />
      <div className="container mx-auto px-4 py-16 relative max-w-[100vw]">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#D4B86A] mb-4">
            Our Expert Team
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet our talented team of professional stylists and grooming experts
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {barbers.map((barber, index) => (
            <BarberCard key={index} {...barber} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Barber;