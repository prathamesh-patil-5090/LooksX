import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import contactBg from '../assets/img/contact.avif';  // Fix: changed from assets to assets

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ...existing form logic...
  };

  const contactInfo = [
    { icon: <FaPhone />, title: 'Phone', content: '+1 234 567 8900' },
    { icon: <FaEnvelope />, title: 'Email', content: 'info@looksx.com' },
    { icon: <FaMapMarkerAlt />, title: 'Location', content: '1234 Street Name, City, State' },
    { icon: <FaClock />, title: 'Working Hours', content: 'Mon - Sat: 9AM to 8PM' }
  ];

  return (
    <div className="min-h-screen bg-[#1A1F2C] pt-20">
      {/* Hero Banner */}
      <div 
        className="relative h-[40vh] bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${contactBg})`,
          backgroundPosition: 'center 25%'
        }}
      >
        <div className="absolute inset-0 bg-[#1A1F2C]/80"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-[#D4B86A] mb-4">Contact Us</h1>
            <p className="text-gray-300 max-w-2xl text-lg">
              We're here to answer any questions you may have about our services. 
              Reach out to us and we'll respond as soon as we can.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white/5 p-8 rounded-lg backdrop-blur-sm border border-gray-800">
            <h2 className="text-2xl font-bold text-[#D4B86A] mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-[#1A1F2C]/50 border border-gray-700 rounded focus:outline-none
                             focus:border-[#D4B86A] text-gray-300 placeholder-gray-400"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-[#1A1F2C]/50 border border-gray-700 rounded focus:outline-none
                             focus:border-[#D4B86A] text-gray-300 placeholder-gray-400"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-3 bg-[#1A1F2C]/50 border border-gray-700 rounded focus:outline-none
                           focus:border-[#D4B86A] text-gray-300 placeholder-gray-400"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Message"
                className="w-full px-4 py-3 bg-[#1A1F2C]/50 border border-gray-700 rounded focus:outline-none
                           focus:border-[#D4B86A] text-gray-300 placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#D4B86A] text-[#1A1F2C] font-semibold rounded hover:bg-[#D4B86A]/90
                           transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-bold text-[#D4B86A] mb-6">Find Us</h3>
              {contactInfo.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 mb-6 last:mb-0">
                  <div className="p-3 bg-[#D4B86A]/10 rounded-lg">
                    <div className="text-[#D4B86A] text-xl">{item.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-[#D4B86A] font-medium mb-1">{item.title}</h4>
                    <p className="text-gray-400">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-bold text-[#D4B86A] mb-6">Location</h3>
              <div className="rounded-lg overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.908289503994!2d72.84961427515697!3d19.02227108218127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf21727f6d8f%3A0x0!2zMTnCsDAxJzIwLjIiTiA3MsKwNTEnMDguNiJF!5e0!3m2!1sen!2sin!4v1690135327016!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
