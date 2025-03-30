import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { GiScissors, GiRazor, GiHairStrands, GiBeard, GiRose } from 'react-icons/gi';
import { MdSpa, MdFace, MdColorLens, MdChildCare } from 'react-icons/md';
import { FaRegClock, FaGlasses } from 'react-icons/fa';
import { BiPaintRoll } from 'react-icons/bi';
import 'swiper/css';
import 'swiper/css/free-mode';

const PriceCard = ({ title, price, duration, services, icon: Icon }) => (
  <div className="relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-sm border border-gray-800 h-[500px]">
    <div className="p-4">   
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#D4B86A] to-[#B89B5D] rounded-lg flex items-center justify-center">
          <Icon className="text-xl text-black" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#D4B86A]">{title}</h3>
          <div className="flex items-center gap-2 text-gray-400">
            <FaRegClock className="text-xs" />
            <span className="text-xs">{duration}</span>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-2xl text-white font-bold mb-0.5">₹{price}</p>
        <p className="text-xs text-gray-400">Starting price</p>
      </div>
      <ul className="space-y-1.5">
        {services.map((service, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4B86A] flex-shrink-0 mt-[0.4rem]" />
            {service}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const MobilePricing = () => {
  const priceData = [
      {
        title: 'Classic Haircut',
        price: '499',
        duration: '45 mins',
        icon: GiScissors,
        services: [
          'Professional Style Consultation',
          'Premium Shampoo & Deep Conditioning',
          'Precision Cutting with Hot Towel Service',
          'Styling with Premium Products',
          'Head Massage & Scalp Treatment',
          'Hair Care Tips & Product Recommendations'
        ]
      },
      {
        title: 'Premium Grooming',
        price: '899',
        duration: '60 mins',
        icon: GiRazor,
        services: [
          'Luxurious Beard Trim & Detailed Shaping',
          'Steam & Hot Towel Treatment',
          'Relaxing Facial Massage with Essential Oils',
          'Premium Hair Styling with Products',
          'Under-eye Treatment & Face Scrub',
          'Grooming Consultation & Tips'
        ]
      },
      {
        title: 'Color Transform',
        price: '1999',
        duration: '120 mins',
        icon: MdColorLens,
        services: [
          'Detailed Color Consultation & Analysis',
          'Ammonia-free Premium Hair Color',
          'Root Touch-up & Full Coverage',
          'Deep Conditioning Treatment Mask',
          'Color Protection Treatment',
          'Style Finishing with Heat Protection'
        ]
      },
      {
        title: 'Royal Spa Day',
        price: '2499',
        duration: '180 mins',
        icon: MdSpa,
        services: [
          'Swedish Full Body Massage',
          'Deep Cleansing Facial Treatment',
          'Luxury Hair Spa with Keratin',
          'Premium Manicure & Pedicure',
          'Aromatherapy Session',
          'Complimentary Herbal Tea Service'
        ]
      },
      {
        title: 'Kids Special',
        price: '299',
        duration: '30 mins',
        icon: MdChildCare,
        services: [
          'Child-Friendly Themed Haircut',
          'Gentle pH-Balanced Shampoo',
          'Fun Styling with Safe Products',
          'Mini Head Massage',
          'Cartoon Movie During Service',
          'Special Treat Package with Toys'
        ]
      },
      {
        title: 'Bridal Package',
        price: '7999',
        duration: '240 mins',
        icon: GiRose,
        services: [
          'Complete HD Bridal Makeup',
          'Professional Hair Styling & Setting',
          'Designer Nail Art & Extensions',
          'Advanced Skin Treatment',
          'Pre-bridal Consultation',
          'Complementary Touch-up Kit'
        ]
      },
      {
        title: 'Hair Treatment',
        price: '1499',
        duration: '90 mins',
        icon: GiHairStrands,
        services: [
          'Advanced Keratin Treatment',
          'Deep Conditioning Therapy',
          'Scalp Analysis & Treatment',
          'Anti-Frizz Smoothening',
          'Hair Protein Treatment',
          'Take-home Hair Care Kit'
        ]
      },
      {
        title: 'Fashion Color',
        price: '2999',
        duration: '180 mins',
        icon: BiPaintRoll,
        services: [
          'Trendy Fashion Colors Application',
          'Professional Highlights & Lowlights',
          'Custom Balayage Treatment',
          'Bond Strengthening Treatment',
          'Color Lock Toner Application',
          'Style Consultation & Maintenance Guide'
        ]
      }
    ];

  return (
    <div className="py-10 min-h-screen bg-[#0d0f15] relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4B86A]/5 to-transparent opacity-60" />
      
      <div className="container mx-auto px-4 py-6 relative flex-1 flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#D4B86A] mb-2">
            Premium Services
          </h2>
          <p className="text-base text-gray-400 max-w-xs mx-auto px-2">
            Discover our extensive range of luxury salon services
          </p>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            className="w-full py-4"
          >
            {priceData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="px-1">
                  <PriceCard {...item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MobilePricing;