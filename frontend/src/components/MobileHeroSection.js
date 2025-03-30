import React, { useState, useEffect } from 'react';
import about1 from "../assets/img/about-1.jpg";
import about2 from "../assets/img/about-2.jpg";
import about3 from "../assets/img/about-3.jpg";
import { IoChevronForward } from 'react-icons/io5';

const slides = [
  {
    image: about1,
    title: "Master Your",
    subtitle: "Style Game",
    description:
      "Where precision meets perfection. Experience grooming excellence crafted exclusively for the modern gentleman."
  },
  {
    image: about2,
    title: "Refine Your",
    subtitle: "Grooming Experience",
    description:
      "Elevate your style with top-notch services and unrivaled attention to detail."
  },
  {
    image: about3,
    title: "Heighten Your",
    subtitle: "Sense of Style",
    description:
      "Unlock the confidence of a polished, modern look tailor-made for you."
  }
];

const MobileStyleCard = ({ title, subtitle, description, isTransitioning }) => (
  <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
    <h2 className="text-white text-3xl font-bold mb-1">{title}</h2>
    <h3 className="text-[#D4B86A] text-4xl font-extrabold mb-3">{subtitle}</h3>
    <p className="text-gray-300 text-sm mb-6 max-w-[280px]">{description}</p>
    <button className="flex items-center gap-2 bg-gradient-to-r from-[#D4B86A] to-[#B89B5D] text-black py-2 px-6 rounded-md font-medium hover:opacity-90 transition-opacity">
      Book Now
      <IoChevronForward className="text-lg" />
    </button>
  </div>
);

const MobileHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[100svh] bg-[#0d0f15] overflow-hidden pt-20">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: index === currentSlide ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-10" />
      
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d0f15] via-[#0d0f15]/80 to-transparent h-2/5 z-10" />
      
      <div className="absolute inset-0 flex flex-col justify-end z-20 pb-16 pt-20">
        <div className="container mx-auto px-6">
          <MobileStyleCard
            title={slides[currentSlide].title}
            subtitle={slides[currentSlide].subtitle}
            description={slides[currentSlide].description}
            isTransitioning={isTransitioning}
          />
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsTransitioning(false);
              }, 500);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-[#D4B86A] w-6" 
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileHeroSection;