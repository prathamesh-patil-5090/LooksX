import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import logo from "../assets/img/LooksX.png";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
      
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    logout(() => navigate('/'));
  };

  const handleBookNow = () => {
    setIsMobileMenuOpen(false);
    if (user) {
      navigate('/appointment');
    } else {
      alert('Please login first to book an appointment');
      navigate('/login');
    }
  };

  const navItems = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Blog", "/blog"],
    ["Contact", "/contact"],
  ];

  return (
    <nav className="bg-[#1A1F2C] text-[#D4B86A] px-4 md:px-6 py-4 flex justify-between items-center fixed w-full z-50 shadow-lg">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="LooksX Logo" className="h-8 md:h-10 mr-2 md:mr-3" />
        <span className="text-xl md:text-2xl font-bold text-[#D4B86A]">LooksX</span>
      </Link>
      
      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-4 lg:space-x-8">
        {navItems.map(([title, url]) => (
          <li key={url}>
            <Link
              to={url}
              className={`hover:text-[#F0C987] transition-colors duration-300 tracking-wide ${
                location.pathname === url ? "text-[#F0C987]" : ""
              }`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
      
      {/* Desktop Action Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <button 
          onClick={handleBookNow}
          className="bg-[#D4B86A] px-4 lg:px-6 py-2 rounded hover:bg-[#F0C987] transition-all duration-300 text-[#1A1F2C] font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Book Now
        </button>
        {user ? (
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={handleDropdownClick}
              className="flex items-center space-x-2 text-[#D4B86A] hover:text-[#F0C987] py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4B86A] focus:ring-opacity-50"
            >
              <span>{user.username}</span>
              <svg 
                className={`w-4 h-4 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#1A1F2C] ring-1 ring-black ring-opacity-5 border border-[#D4B86A]/20 py-1"
              >
                <Link
                  to={user.role === 'barber' ? '/barber-dashboard' : '/customer-dashboard'}
                  className="block px-4 py-3 text-sm text-[#D4B86A] hover:bg-[#2C3345] transition-colors duration-150"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-sm text-[#D4B86A] hover:bg-[#2C3345] transition-colors duration-150"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-sm text-[#D4B86A] hover:bg-[#2C3345] transition-colors duration-150"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="text-[#D4B86A] hover:text-[#F0C987] font-medium"
          >
            Login
          </Link>
        )}
      </div>
      
      {/* Mobile Menu Button */}
      <button 
        ref={mobileButtonRef}
        className="md:hidden text-[#D4B86A] hover:text-[#F0C987]"
        onClick={handleMobileMenuToggle}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="absolute top-full left-0 right-0 bg-[#1A1F2C] border-t border-[#D4B86A]/20 shadow-lg md:hidden"
        >
          <div className="p-4 flex flex-col space-y-3">
            {navItems.map(([title, url]) => (
              <Link
                key={url}
                to={url}
                className={`block py-2 px-4 rounded hover:bg-[#2C3345] ${
                  location.pathname === url ? "text-[#F0C987]" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {title}
              </Link>
            ))}
            <div className="border-t border-[#D4B86A]/10 pt-3">
              <button 
                onClick={handleBookNow}
                className="block w-full bg-[#D4B86A] px-4 py-2 rounded hover:bg-[#F0C987] transition-all duration-300 text-[#1A1F2C] font-bold"
              >
                Book Now
              </button>
            </div>
            {user ? (
              <div className="border-t border-[#D4B86A]/10 pt-3 flex flex-col space-y-2">
                <div className="text-[#D4B86A] font-medium px-4 py-2">
                  Logged in as {user.username}
                </div>
                <Link
                  to={user.role === 'barber' ? '/barber-dashboard' : '/customer-dashboard'}
                  className="block px-4 py-2 rounded hover:bg-[#2C3345]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 rounded hover:bg-[#2C3345]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded text-[#D4B86A] hover:bg-[#2C3345]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 rounded hover:bg-[#2C3345] border-t border-[#D4B86A]/10 mt-3 pt-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
