import React from 'react';
import { GiScissors, GiBeard, GiRazor, GiFaceToFace } from 'react-icons/gi';

const ServiceCard = ({ title, description, icon: Icon }) => (
  <div className="group relative p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-[#D4B86A]/50 h-[470px]">
    <div className="absolute inset-0 bg-gradient-to-br from-[#D4B86A]/10 to-[#B89B5D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative z-10">
      <div className="w-14 h-14 bg-gradient-to-br from-[#D4B86A] to-[#B89B5D] rounded-lg flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-2xl text-black" />
      </div>
      <h3 className="text-2xl font-bold text-[#D4B86A] mb-4">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>
    </div>
  </div>
);

const Services = () => {
  const services = [
    {
      title: "Signature Styling",
      description: "Experience transformative haircuts and styling from our master artists, customized to enhance your unique features and personality.",
      icon: GiScissors
    },
    {
      title: "Precision Grooming",
      description: "Meticulous beard sculpting and trimming services that define your facial features and elevate your personal style.",
      icon: GiBeard
    },
    {
      title: "Luxury Treatments",
      description: "Indulge in our premium grooming treatments, including hot towel services and rejuvenating facial therapies.",
      icon: GiRazor
    },
    {
      title: "Wellness Rituals",
      description: "Immerse yourself in our therapeutic spa treatments designed to refresh your mind and revitalize your appearance.",
      icon: GiFaceToFace
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-[#0d0f15] relative overflow-hidden h-[500px]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4B86A]/5 to-transparent opacity-60"></div>
      <div className="container mx-auto px-4 py-16 relative max-w-[100vw]">
        <div className="max-w-4xl mb-16"> {/* Removed text-center and added max-width */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#D4B86A] mb-4">
            Trendy Salon & Spa
          </h1>
          <p className="text-xl text-gray-400">
            Experience the art of transformation through our curated collection of luxury services
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;