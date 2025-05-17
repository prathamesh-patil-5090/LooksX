import React from 'react';
import { FaStar, FaQuoteRight, FaCalendarAlt, FaUser, FaClock, FaMapMarkerAlt, FaTag } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    title: "Best Grooming Experience Ever",
    author: "John Mitchell",
    date: "January 15, 2024",
    location: "Mumbai Central",
    duration: "75 minutes",
    service: "Premium Haircut & Royal Shave",
    price: "₹1299",
    barber: "Alex Thompson",
    image: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c",
    rating: 5,
    content: "I've never experienced such attention to detail in a haircut. The hot towel treatment was incredibly relaxing, and Alex took the time to understand exactly what style I wanted. The scalp massage was an unexpected bonus. My hair has never looked better, and the beard trimming was absolutely precise.",
    tags: ["Premium Service", "Hot Towel", "Beard Grooming"],
    verified: true
  },
  {
    id: 2,
    title: "Outstanding Service and Atmosphere",
    author: "David Cooper",
    date: "January 12, 2024",
    location: "Bandra West",
    duration: "90 minutes",
    service: "Signature Grooming Package",
    price: "₹1899",
    barber: "Mike Johnson",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
    rating: 5,
    content: "From the moment I walked in, I knew this wasn't your average salon. The ambient lighting, comfortable chairs, and professional staff made me feel like royalty. Mike's expertise in modern styling techniques is evident. The complimentary beverages and styling tips were great touches.",
    tags: ["Luxury Experience", "Expert Styling", "Modern Techniques"],
    verified: true
  },
  {
    id: 3,
    title: "Worth Every Penny",
    author: "Michael Ross",
    date: "January 10, 2024",
    location: "Andheri East",
    duration: "120 minutes",
    service: "Complete Makeover Package",
    price: "₹2499",
    barber: "James Williams",
    image: "https://images.unsplash.com/photo-1512690459411-b9245aed614b",
    rating: 5,
    content: "Opted for the complete makeover package and it was transformative. The hair color consultation was thorough, and James really understood the look I was going for. The facial and head massage were so relaxing I almost fell asleep. The final result exceeded my expectations - I look and feel years younger.",
    tags: ["Hair Color", "Facial", "Transformation"],
    verified: true
  },
  {
    id: 4,
    title: "Exceptional Beard Grooming",
    author: "James Wilson",
    date: "January 8, 2024",
    location: "Mumbai Central",
    duration: "60 minutes",
    service: "Premium Haircut & Beard Trim",
    price: "₹899",
    barber: "Alex Thompson",
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea",
    rating: 5,
    content: "Their beard grooming service is top-notch. The hot towel treatment and precision trimming made my beard look better than ever.",
    tags: ["Beard Care", "Premium", "Hot Towel"],
    verified: true
  },
  {
    id: 5,
    title: "Modern Classic Experience",
    author: "Robert Black",
    date: "January 5, 2024",
    location: "Mumbai Central",
    duration: "60 minutes",
    service: "Premium Haircut & Beard Trim",
    price: "₹899",
    barber: "Alex Thompson",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
    rating: 5,
    content: "LooksX perfectly blends classic barbering with modern styling. The attention to detail and personalized service makes every visit special.",
    tags: ["Classic", "Modern", "Styling"],
    verified: true
  },
  {
    id: 6,
    title: "Professional and Relaxing",
    author: "Chris Thompson",
    date: "January 3, 2024",
    location: "Mumbai Central",
    duration: "60 minutes",
    service: "Premium Haircut & Beard Trim",
    price: "₹899",
    barber: "Alex Thompson",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
    rating: 5,
    content: "From the moment you walk in, the atmosphere is welcoming and professional. The scalp massage during the wash is incredibly relaxing.",
    tags: ["Relaxing", "Professional", "Premium"],
    verified: true
  }
];

const BlogCard = ({ review }) => (
  <div className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 border border-gray-800 hover:border-[#D4B86A] h-full flex flex-col">
    <div className="relative">
      <img src={review.image} alt={review.title} className="w-full h-48 object-cover" />
      {review.verified && (
        <span className="absolute top-2 right-2 bg-[#D4B86A] text-black text-xs px-2 py-1 rounded-full">
          Verified Visit
        </span>
      )}
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <div className="flex flex-wrap items-center gap-4 mb-3 text-xs text-gray-400">
        <span className="flex items-center gap-2">
          <FaCalendarAlt className="text-[#D4B86A]" /> {review.date}
        </span>
        <span className="flex items-center gap-2">
          <FaUser className="text-[#D4B86A]" /> {review.author}
        </span>
        <span className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-[#D4B86A]" /> {review.location}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-[#D4B86A] mb-2">{review.title}</h3>
      
      <div className="flex items-center gap-2 mb-3">
        <div className="flex text-[#D4B86A]">
          {[...Array(review.rating)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <span className="text-sm text-gray-400">5.0</span>
      </div>

      <div className="flex flex-col gap-2 mb-4 text-sm text-gray-300">
        <p className="flex items-center gap-2">
          <FaClock className="text-[#D4B86A]" />
          Duration: {review.duration}
        </p>
        <p className="flex items-center gap-2">
          <FaTag className="text-[#D4B86A]" />
          Service: {review.service}
        </p>
        <p className="flex items-center gap-2">
          <span className="text-[#D4B86A]">₹</span>
          Price: {review.price}
        </p>
        <p className="flex items-center gap-2">
          <FaUser className="text-[#D4B86A]" />
          Barber: {review.barber}
        </p>
      </div>

      <p className="text-gray-300 mb-4 flex-grow">{review.content}</p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
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
        <div className="mr-5 text-center mb-16">
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
        <div className="ml-5 mt-16 bg-white/5 rounded-lg p-8 text-center relative">
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