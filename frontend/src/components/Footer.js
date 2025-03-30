import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setExpandedSection(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    setEmail('');
  };

  return (
    <footer className="relative bg-[#1A1F2C] text-gray-300">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/30 to-[#1A1F2C] pointer-events-none"></div>
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className={`${isMobile ? 'flex flex-col space-y-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'}`}>
          {/* Company Info */}
          <div className={`backdrop-blur-sm flex flex-col ${isMobile ? 'pb-4 border-b border-gray-800' : ''}`}>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#D4B86A] to-[#D4B86A]/80 bg-clip-text text-transparent">
              LooksX
            </h2>
            <p className="mb-4 text-gray-400 hover:text-gray-300 transition-colors">1234 Street Name, City, State, 12345</p>
            <p className="mb-4 text-gray-400 hover:text-gray-300 transition-colors">Email: info@looksx.com</p>
            <p className="text-gray-400 hover:text-gray-300 transition-colors">Phone: (123) 456-7890</p>
          </div>

          {/* Quick Links */}
          {isMobile ? (
            <div className="border-b border-gray-800 pb-4 flex flex-col">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('links')}
              >
                <h2 className="text-xl font-bold text-[#D4B86A]">Quick Links</h2>
                {expandedSection === 'links' ? <FaChevronUp className="text-[#D4B86A]" /> : <FaChevronDown className="text-[#D4B86A]" />}
              </div>
              {expandedSection === 'links' && (
                <ul className="space-y-3 mt-4">
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
              )}
            </div>
          ) : (
            <div className="flex flex-col">
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
          )}

          {/* Business Hours */}
          {isMobile ? (
            <div className="border-b border-gray-800 pb-4 flex flex-col">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('hours')}
              >
                <h2 className="text-xl font-bold text-[#D4B86A]">Business Hours</h2>
                {expandedSection === 'hours' ? <FaChevronUp className="text-[#D4B86A]" /> : <FaChevronDown className="text-[#D4B86A]" />}
              </div>
              {expandedSection === 'hours' && (
                <>
                  <ul className="space-y-3 mt-4">
                    <li className="text-gray-400">Monday - Friday: 9:00 AM - 8:00 PM</li>
                    <li className="text-gray-400">Saturday: 10:00 AM - 6:00 PM</li>
                    <li className="text-gray-400">Sunday: 11:00 AM - 5:00 PM</li>
                  </ul>
                  <div className="mt-6">
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
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col">
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
          )}

          {/* Newsletter */}
          {isMobile ? (
            <div className="pb-4 flex flex-col">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('newsletter')}
              >
                <h2 className="text-xl font-bold text-[#D4B86A]">Newsletter</h2>
                {expandedSection === 'newsletter' ? <FaChevronUp className="text-[#D4B86A]" /> : <FaChevronDown className="text-[#D4B86A]" />}
              </div>
              {expandedSection === 'newsletter' && (
                <>
                  <p className="mb-4 mt-4 text-gray-400">Stay updated with our latest styles and offers!</p>
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
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col">
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
          )}

          {/* Social Icons - Only for mobile, outside of accordions */}
          {isMobile && expandedSection !== 'hours' && (
            <div className="flex justify-center space-x-6 py-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-[#D4B86A] transition-colors text-2xl">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-[#D4B86A] transition-colors text-2xl">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-[#D4B86A] transition-colors text-2xl">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-[#D4B86A] transition-colors text-2xl">
                <FaYoutube />
              </a>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className={`${isMobile ? 'mt-4 pt-4' : 'mt-16 pt-8'} border-t border-gray-800 text-center`}>
          <p className="text-gray-500">&copy; 2025
            <span className="bg-gradient-to-r from-[#D4B86A] to-[#D4B86A]/80 bg-clip-text text-transparent"> LooksX</span>. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
