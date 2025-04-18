import React, { useState, useEffect } from 'react';
import testimonial from '../assets/img/testimonial.jpg';
import { FaQuoteLeft } from 'react-icons/fa';

const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const quotes = [
    {
      text: "Style is a way to say who you are without having to speak.",
      author: "Dio Brando",
    },
    {
      text: "Your hair is the crown you never take off. Treat it like royalty.",
      author: "Prathamesh Patil",
    },
    {
      text: "Life is too short to have boring hair.",
      author: "Jotaro Kujo",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[50svh] sm:h-[55svh] md:h-[60svh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={testimonial}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="mx-auto px-4 sm:px-6 text-center max-w-full md:max-w-4xl">
          <FaQuoteLeft className="text-[#D4B86A] text-3xl sm:text-4xl md:text-5xl mx-auto mb-4 sm:mb-6 md:mb-8" />
          <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 sm:mb-6 italic">
              "{quotes[currentQuote].text}"
            </p>
            <p className="text-[#D4B86A] text-lg md:text-xl">
              - {quotes[currentQuote].author}
            </p>
          </div>
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {quotes.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentQuote ? 'bg-[#D4B86A] w-6' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;