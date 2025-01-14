import React from 'react';
import { FaStar, FaQuoteRight, FaCalendarAlt, FaUser } from 'react-icons/fa';

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
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",  // Updated image URL
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
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea",  // Updated to a professional beard grooming image
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

const BlogCard = ({ review }) => (
  <div className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 border border-gray-800 hover:border-[#D4B86A]">
    <img src={review.image} alt={review.title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
        <span className="flex items-center gap-2">
          <FaCalendarAlt className="text-[#D4B86A]" /> {review.date}
        </span>
        <span className="flex items-center gap-2">
          <FaUser className="text-[#D4B86A]" /> {review.author}
        </span>
      </div>
      <h3 className="text-xl font-bold text-[#D4B86A] mb-2">{review.title}</h3>
      <div className="flex text-[#D4B86A] mb-3">
        {[...Array(review.rating)].map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      <p className="text-gray-300 mb-4">{review.content}</p>
      <div className="flex flex-wrap gap-2">
        {review.tags.map((tag, index) => (
          <span key={index} className="text-xs bg-[#D4B86A]/20 text-[#D4B86A] px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Blog = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#D4B86A] mb-4">Client Reviews</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Read what our valued clients have to say about their experience at LooksX. 
            We take pride in delivering exceptional service and creating lasting relationships.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <BlogCard key={review.id} review={review} />
          ))}
        </div>

        {/* Featured Quote */}
        <div className="mt-16 bg-white/5 rounded-lg p-8 text-center relative">
          <FaQuoteRight className="text-[#D4B86A]/20 text-6xl absolute top-4 right-4" />
          <p className="text-2xl text-gray-300 italic mb-4">
            "Where style meets sophistication. LooksX has redefined the modern grooming experience."
          </p>
          <p className="text-[#D4B86A]">- Style Magazine</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
