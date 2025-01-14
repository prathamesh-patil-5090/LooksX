import React from 'react';
import { GiScissors, GiRazor, GiHairStrands, GiBeard, GiRose } from 'react-icons/gi';
import { MdSpa, MdFace, MdColorLens, MdChildCare } from 'react-icons/md';
import { FaRegClock, FaGlasses } from 'react-icons/fa';
import { BiPaintRoll } from 'react-icons/bi';

const PriceCard = ({ title, price, duration, services, icon: Icon }) => (
  <div className="group p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800 transition-all duration-300 hover:border-[#D4B86A] hover:transform hover:-translate-y-2">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-gradient-to-br from-[#D4B86A] to-[#B89B5D] rounded-lg flex items-center justify-center">
        <Icon className="text-2xl text-black" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-[#D4B86A]">{title}</h3>
        <div className="flex items-center gap-2 text-gray-400">
          <FaRegClock className="text-sm" />
          <span className="text-sm">{duration}</span>
        </div>
      </div>
    </div>
    <div className="mb-6">
      <p className="text-4xl text-white font-bold mb-1">₹{price}</p>
      <p className="text-gray-400 text-sm">Starting price</p>
    </div>
    <ul className="space-y-3">
      {services.map((service, index) => (
        <li key={index} className="flex items-center gap-2 text-gray-300">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4B86A]" />
          {service}
        </li>
      ))}
    </ul>
  </div>
);

const Pricing = () => {
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
    }
  ];

  return (
    <div className="pt-32 min-h-screen bg-[#0d0f15] relative overflow-hidden"> {/* Changed pt-20 to pt-32 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4B86A]/5 to-transparent opacity-60" />
      <div className="container mx-auto px-4 py-20 relative max-w-[100vw]"> {/* Changed py-16 to py-20 */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#D4B86A] mb-4">
            Premium Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our extensive range of luxury salon services
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {priceData.map((item, index) => (
            <PriceCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;