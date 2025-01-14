import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    setEmail('');
  };

  return (
    <footer className="relative bg-[#1A1F2C] text-gray-300">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/30 to-[#1A1F2C] pointer-events-none"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#D4B86A] to-[#D4B86A]/80 bg-clip-text text-transparent">
              LooksX
            </h2>
            <p className="mb-4 text-gray-400 hover:text-gray-300 transition-colors">1234 Street Name, City, State, 12345</p>
            <p className="mb-4 text-gray-400 hover:text-gray-300 transition-colors">Email: info@looksx.com</p>
            <p className="text-gray-400 hover:text-gray-300 transition-colors">Phone: (123) 456-7890</p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-[#D4B86A]">Quick Links</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#D4B86A] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#D4B86A] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#D4B86A] transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#D4B86A] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-[#D4B86A]">Business Hours</h2>
            <ul className="space-y-3">
              <li className="text-gray-400">Monday - Friday: 9:00 AM - 8:00 PM</li>
              <li className="text-gray-400">Saturday: 10:00 AM - 6:00 PM</li>
              <li className="text-gray-400">Sunday: 11:00 AM - 5:00 PM</li>
            </ul>
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-[#D4B86A]">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-[#D4B86A] transition-colors text-xl">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-[#D4B86A] transition-colors text-xl">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-[#D4B86A] transition-colors text-xl">
                  <FaInstagram />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-[#D4B86A] transition-colors text-xl">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-[#D4B86A]">Newsletter</h2>
            <p className="mb-4 text-gray-400">Stay updated with our latest styles and offers!</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-700 rounded-lg 
                         focus:outline-none focus:border-[#D4B86A] transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#D4B86A] text-[#1A1F2C] font-semibold rounded-lg 
                         hover:bg-[#D4B86A]/90 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} 
            <span className="bg-gradient-to-r from-[#D4B86A] to-[#D4B86A]/80 bg-clip-text text-transparent"> LooksX</span>. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
