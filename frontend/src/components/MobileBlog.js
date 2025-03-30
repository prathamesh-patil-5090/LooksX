import React, { useState, useEffect } from 'react';
import { FaStar, FaCalendarAlt, FaUser } from 'react-icons/fa';

const MobileReviewCard = ({ review }) => (
  <div className="w-full max-w-[350px] mx-auto bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-700 border border-gray-800 hover:border-[#D4B86A] h-full flex flex-col">
    <img src={review.image} alt={review.title} className="w-full h-48 object-cover" />
    <div className="p-4 flex-grow flex flex-col">
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
        <span className="flex items-center gap-1">
          <FaCalendarAlt className="text-[#D4B86A]" /> {review.date}
        </span>
        <span className="flex items-center gap-1">
          <FaUser className="text-[#D4B86A]" /> {review.author}
        </span>
      </div>
      <h3 className="text-lg font-bold text-[#D4B86A] mb-2">{review.title}</h3>
      <div className="flex text-[#D4B86A] mb-2">
        {[...Array(review.rating)].map((_, i) => (
          <FaStar key={i} className="text-sm" />
        ))}
      </div>
      <p className="text-gray-300 text-sm mb-3 line-clamp-3">{review.content}</p>
      <div className="flex flex-wrap gap-1 mt-auto">
        {review.tags.map((tag, index) => (
          <span key={index} className="text-xs bg-[#D4B86A]/20 text-[#D4B86A] px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const MobileBlog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const reviews = [
    {
      id: 1,
      title: "Best Grooming Experience Ever",
      author: "John Mitchell",
      date: "January 15, 2024",
      image: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c",
      rating: 5,
      content: "LooksX has completely transformed my grooming routine. The attention to detail and professional service is unmatched. Their barbers are true artists who understand modern men's styling needs.",
      tags: ["Haircut", "Grooming", "Premium Service"]
    },
    {
      id: 2,
      title: "Outstanding Service and Atmosphere",
      author: "David Cooper",
      date: "January 12, 2024",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
      rating: 5,
      content: "The ambiance at LooksX is sophisticated yet welcoming. Their commitment to excellence shows in every aspect, from the initial consultation to the final styling.",
      tags: ["Premium", "Atmosphere", "Service"]
    },
    {
      id: 3,
      title: "Worth Every Penny",
      author: "Michael Ross",
      date: "January 10, 2024",
      image: "https://images.unsplash.com/photo-1512690459411-b9245aed614b",
      rating: 5,
      content: "While premium priced, the service quality at LooksX justifies every cent. The skills of their barbers and the luxury experience make it my go-to place for grooming.",
      tags: ["Premium", "Expert Barbers", "Luxury"]
    },
    {
      id: 4,
      title: "Exceptional Beard Grooming",
      author: "James Wilson",
      date: "January 8, 2024",
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea",
      rating: 5,
      content: "Their beard grooming service is top-notch. The hot towel treatment and precision trimming made my beard look better than ever.",
      tags: ["Beard Care", "Premium", "Hot Towel"]
    },
    {
      id: 5,
      title: "Modern Classic Experience",
      author: "Robert Black",
      date: "January 5, 2024",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
      rating: 5,
      content: "LooksX perfectly blends classic barbering with modern styling. The attention to detail and personalized service makes every visit special.",
      tags: ["Classic", "Modern", "Styling"]
    },
    {
      id: 6,
      title: "Professional and Relaxing",
      author: "Chris Thompson",
      date: "January 3, 2024",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
      rating: 5,
      content: "From the moment you walk in, the atmosphere is welcoming and professional. The scalp massage during the wash is incredibly relaxing.",
      tags: ["Relaxing", "Professional", "Premium"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 300);
    }, 5000); // Increased duration to 5 seconds for better readability

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col">
      {/* Header Section */}
      <div className="text-center pt-20 mb-8">
        <h1 className="text-4xl font-bold text-[#D4B86A] mb-4">Client Reviews</h1>
        <p className="text-gray-400 max-w-2xl mx-auto px-4 text-sm">
          Read what our valued clients have to say about their experience at LooksX. 
          We take pride in delivering exceptional service and creating lasting relationships.
        </p>
      </div>

      <div className="flex-1 flex items-center">
        <div className="w-full px-4 relative overflow-hidden">
          <div className={`transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <MobileReviewCard review={reviews[currentIndex]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileBlog;
