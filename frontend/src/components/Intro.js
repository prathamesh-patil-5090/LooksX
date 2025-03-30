import React from "react";
import { useNavigate } from "react-router-dom";
import beard1 from "../assets/img/service-6.jpg";
import beard2 from "../assets/img/service-8.jpg";
import beard3 from "../assets/img/service-1.jpg";

const Intro = () => {
  const navigate = useNavigate();

  const handleExploreServices = () => {
    navigate('/services');
  };

  return (
    <section className="py-20 bg-[#1A1F2C] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-32 flex flex-col lg:flex-row items-center justify-between max-w-[100vw]">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h3 className="text-[#a27b5c] text-lg font-medium mb-2">Welcome to</h3>
          <h1 className="text-white text-5xl font-bold mb-4">LooksX Fashion</h1>
          <h2 className="text-[#a27b5c] text-2xl mb-8">Premium Style Services</h2>
          <div className="mb-8">
            <img 
              src={beard1} 
              alt="LooksX Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <p className="text-gray-300 leading-relaxed mb-8 max-w-xl">
            Discover the art of personal transformation at LooksX. We blend contemporary 
            fashion with personalized styling to create your signature look. Our expert 
            stylists and premium services ensure you leave feeling confident and looking exceptional.
          </p>
          <button 
            onClick={handleExploreServices}
            className="bg-[#a27b5c] text-white py-2 px-4 rounded-lg hover:bg-[#8b684d] transition-colors"
          >
            Explore Services
          </button>
        </div>
        <div className="lg:w-1/2 relative h-[500px]">
          <img
            className="absolute top-0 left-0 w-64 h-64 object-cover rounded-lg shadow-xl z-20"
            src={beard1}
            alt="Barber service 1"
          />
          <img
            className="absolute top-0 right-0 w-64 h-64 object-cover rounded-lg shadow-xl z-10"
            src={beard2}
            alt="Barber service 2"
          />
          <img
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-64 object-cover rounded-lg shadow-xl z-30"
            src={beard3}
            alt="Barber service 3"
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;