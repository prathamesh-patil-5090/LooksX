import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import logo from "../assets/img/LooksX.png";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout(() => navigate('/'));
  };

  const handleBookNow = () => {
    if (user) {
      navigate('/appointment');
    } else {
      alert('Please login first to book an appointment');
      navigate('/login');
    }
  };

  return (
    <nav className="bg-[#1A1F2C] text-[#D4B86A] px-6 py-4 flex justify-between items-center fixed w-full z-50 shadow-lg">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="LooksX Logo" className="h-10 mr-3" />
        <span className="text-2xl font-bold text-[#D4B86A]">LooksX</span>
      </Link>
      <ul className="flex space-x-8">
        {[
          ["Home", "/"],
          ["About", "/about"],
          ["Services", "/services"],
          ["Blog", "/blog"],
          ["Contact", "/contact"],
        ].map(([title, url]) => (
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
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleBookNow}
          className="bg-[#D4B86A] px-6 py-2 rounded hover:bg-[#F0C987] transition-all duration-300 text-[#1A1F2C] font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
    </nav>
  );
};

export default Navbar;
