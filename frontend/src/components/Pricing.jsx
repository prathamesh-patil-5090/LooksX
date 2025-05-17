import React, { useState } from 'react';
import { GiScissors, GiRazor, GiHairStrands, GiBeard, GiRose, GiLeatherBoot, GiSparkles, GiFaceToFace } from 'react-icons/gi';
import { MdSpa, MdFace, MdColorLens, MdChildCare } from 'react-icons/md';
import { FaRegClock, FaGlasses } from 'react-icons/fa';
import { BiPaintRoll } from 'react-icons/bi';

const PriceCard = ({ title, price, duration, services, icon: Icon }) => (
  <div className="group p-3 sm:p-4 md:p-6 bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800 transition-all duration-300 hover:border-[#D4B86A] hover:transform hover:-translate-y-2">
    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#D4B86A] to-[#B89B5D] rounded-lg flex items-center justify-center">
        <Icon className="text-lg md:text-xl text-black" />
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-bold text-[#D4B86A]">{title}</h3>
        <div className="flex items-center gap-2 text-gray-400">
          <FaRegClock className="text-xs" />
          <span className="text-xs">{duration}</span>
        </div>
      </div>
    </div>
    <div className="mb-3 md:mb-4">
      <p className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-1">₹{price}</p>
      <p className="text-xs text-gray-400">Starting price</p>
    </div>
    <ul className="space-y-1.5 sm:space-y-2">
      {services.map((service, index) => (
        <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4B86A] flex-shrink-0" />
          {service}
        </li>
      ))}
    </ul>
  </div>
);

const Pricing = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const priceData = [
    {
      title: 'Classic Haircut',
      price: '499',
      duration: '45 mins',
      icon: GiScissors,
      services: [
        'Style Consultation',
        'Shampoo & Conditioning',
        'Precision Cutting',
        'Styling & Finishing'
      ]
    },
    {
      title: 'Premium Grooming',
      price: '899',
      duration: '60 mins',
      icon: GiRazor,
      services: [
        'Beard Trim & Shaping',
        'Hot Towel Treatment',
        'Facial Massage',
        'Hair Styling'
      ]
    },
    {
      title: 'Color Transform',
      price: '1999',
      duration: '120 mins',
      icon: MdColorLens,
      services: [
        'Color Consultation',
        'Premium Hair Color',
        'Treatment Mask',
        'Style Finishing'
      ]
    },
    {
      title: 'Royal Spa Day',
      price: '2499',
      duration: '180 mins',
      icon: MdSpa,
      services: [
        'Full Body Massage',
        'Facial Treatment',
        'Hair Spa',
        'Manicure & Pedicure'
      ]
    },
    {
      title: 'Kids Special',
      price: '299',
      duration: '30 mins',
      icon: MdChildCare,
      services: [
        'Child-Friendly Cut',
        'Gentle Shampoo',
        'Fun Styling',
        'Treat Package'
      ]
    },
    {
      title: 'Bridal Package',
      price: '7999',
      duration: '240 mins',
      icon: GiRose,
      services: [
        'Complete Hair Styling',
        'Makeup Session',
        'Nail Art',
        'Skin Treatment'
      ]
    },
    {
      title: 'Hair Treatment',
      price: '1499',
      duration: '90 mins',
      icon: GiHairStrands,
      services: [
        'Keratin Treatment',
        'Deep Conditioning',
        'Scalp Therapy',
        'Anti-Frizz Care'
      ]
    },
    {
      title: 'Fashion Color',
      price: '2999',
      duration: '180 mins',
      icon: BiPaintRoll,
      services: [
        'Fashion Colors',
        'Highlights',
        'Balayage',
        'Toner Treatment'
      ]
    },
    {
      title: "Color Artistry",
      price: '2499',
      duration: '150 mins',
      icon: MdColorLens,
      services: [
        'Expert color services including balayage, highlights, and creative coloring techniques performed by our certified colorists.'
      ]
    },
    {
      title: "Bridal Excellence",
      price: '9999',
      duration: '300 mins',
      icon: GiRose,
      services: [
        'Comprehensive bridal packages featuring hair styling, makeup, and spa treatments for your special day.'
      ]
    },
    {
      title: "Hair Therapy",
      price: '1999',
      duration: '120 mins',
      icon: GiHairStrands,
      services: [
        'Advanced hair treatments including keratin smoothing, deep conditioning, and scalp treatments for optimal hair health.'
      ]
    },
    {
      title: "Royal Package",
      price: '4999',
      duration: '240 mins',
      icon: GiSparkles,
      services: [
        'A complete head-to-toe transformation including premium haircut, color, spa treatments, and styling services.'
      ]
    },
    {
      title: "Kids' Corner",
      price: '399',
      duration: '45 mins',
      icon: MdChildCare,
      services: [
        'Child-friendly haircuts and styling in a fun, comfortable environment with experienced youth specialists.'
      ]
    },
    {
      title: "Express Services",
      price: '999',
      duration: '30 mins',
      icon: FaRegClock,
      services: [
        'Quick touch-ups and express styling services for those on the go, without compromising on quality.'
      ]
    },
    {
      title: "Advanced Skincare",
      price: '2999',
      duration: '90 mins',
      icon: MdFace,
      services: [
        'Professional facial treatments, chemical peels, and custom skincare solutions for radiant, healthy skin.'
      ]
    },
    {
      title: "Nail Artistry",
      price: '1999',
      duration: '60 mins',
      icon: GiLeatherBoot,
      services: [
        'Luxury manicure and pedicure services featuring premium products and artistic nail designs.'
      ]
    }
  ];

  const pageCount = Math.ceil(priceData.length / itemsPerPage);
  const currentItems = priceData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="bg-[#0d0f15] relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4B86A]/5 to-transparent opacity-60" />
      <div className="container mx-auto px-4 py-8 relative flex flex-col h-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#D4B86A] mb-2">
            Premium Services
          </h2>
          <p className="text-xs md:text-sm text-gray-400 max-w-2xl mx-auto">
            Discover our extensive range of luxury salon services
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max">
          {currentItems.map((item, index) => (
            <PriceCard key={index} {...item} />
          ))}
        </div>
        <div className="flex justify-center gap-2 py-6 mt-auto">
          {[...Array(pageCount)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                currentPage === i ? 'bg-[#D4B86A]' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;