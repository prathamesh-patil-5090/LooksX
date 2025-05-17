import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Master Your",
    subtitle: "Style Game",
    description:
      "Where precision meets perfection. Experience grooming excellence crafted exclusively for the modern gentleman."
  },
  {
    title: "Refine Your",
    subtitle: "Grooming Experience",
    description:
      "Elevate your style with top-notch services and unrivaled attention to detail."
  },
  {
    title: "Heighten Your",
    subtitle: "Sense of Style",
    description:
      "Unlock the confidence of a polished, modern look tailor-made for you."
  }
];

function StyleCard({ title, subtitle, description, isTransitioning }) {
  const navigate = useNavigate();

  const handleExploreServices = () => {
    navigate('/services');
  };

  const handleBookAppointment = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/appointment');
    } else {
      alert('Please login to book an appointment');
    }
  };

  return (
    <div className="relative w-[600px] rounded-lg overflow-hidden">
      <div className="backdrop-blur-sm bg-[#1A1F2C]/30 p-8 rounded-lg">
        <div
          className={`transition-all duration-500 ${
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <h1 className="text-4xl font-bold mb-4">
            {title}
            <span className="block mt-1 text-[#F0C987]">
              {subtitle}
            </span>
          </h1>
          <p className="text-lg mb-6 font-light text-white">
            {description}
          </p>
          <div className="flex gap-4">
            <button 
              onClick={handleBookAppointment}
              className="bg-[#D4B86A] px-6 py-2 rounded hover:bg-[#F0C987] transition-all duration-300 text-[#1A1F2C] font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Book Appointment
            </button>
            <button 
              onClick={handleExploreServices}
              className="bg-white/10 backdrop-blur-sm border-2 border-white px-6 py-2 rounded hover:bg-white/20 transition-all duration-300 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StyleCardContainer() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { title, subtitle, description } = slides[current];

  return (
    <StyleCard
      title={title}
      subtitle={subtitle}
      description={description}
      isTransitioning={isAnimating}
    />
  );
}

export default StyleCardContainer;