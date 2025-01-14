import React, { useState, useEffect } from "react";
import about1 from "../assets/img/about-1.jpg";
import about2 from "../assets/img/about-2.jpg";
import about3 from "../assets/img/about-3.jpg";
import StyleCard from "./StyleCard";

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

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen"> {/* Removed pt-[76px] */}
      <div className="h-screen relative overflow-hidden"> {/* Changed to full h-screen */}
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
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F2C]/70 to-transparent z-10" />
        
        <div className="absolute inset-0 flex items-center z-20 mt-[200px]"> {/* Increased mt-[76px] to mt-[120px] */}
          <div className="container pl-20 lg:pl-32 max-w-[100vw]">
            <StyleCard
              title={slides[currentSlide].title}
              subtitle={slides[currentSlide].subtitle}
              description={slides[currentSlide].description}
              isTransitioning={isTransitioning}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
