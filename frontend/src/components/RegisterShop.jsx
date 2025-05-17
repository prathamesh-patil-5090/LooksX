import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterShop = () => {
  // Define default compulsory services with Indian Rupee prices
  const compulsoryServices = [
    { name: 'Haircut', price: '299' },
    { name: 'Shave', price: '199' },
    { name: 'Hair Color', price: '499' },
    { name: 'Facial', price: '599' }
  ];
  
  const [formData, setFormData] = useState({
    name: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    services: compulsoryServices // Initialize with compulsory services
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', price: '' }]
    }));
  };

  const removeService = (index) => {
    // Don't allow removing compulsory services
    if (index < compulsoryServices.length) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8800/api/barber/shops',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update local storage with new user data including shop info
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/barber-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Shop registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1A1F2C] to-[#2C3345] py-16"> {/* Increased top padding */}
      <div className="w-full max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-4 sm:p-8 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">Register Your Barbershop</h2>
          {error && <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <input
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="name"
                placeholder="Shop Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="address.street"
                placeholder="Street Address"
                value={formData.address.street}
                onChange={handleChange}
                required
              />
              <input
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="address.city"
                placeholder="City"
                value={formData.address.city}
                onChange={handleChange}
                required
              />
              <input
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="address.state"
                placeholder="State"
                value={formData.address.state}
                onChange={handleChange}
                required
              />
              <input
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="address.zipCode"
                placeholder="ZIP Code"
                value={formData.address.zipCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="services-section space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Services</h3>
              
              <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 sm:p-4 mb-2">
                <h4 className="text-yellow-300 font-medium mb-2">Compulsory Services</h4>
                <p className="text-gray-300 text-xs mb-3">These services are required for all registered shops. You can adjust the prices.</p>
                
                {formData.services.slice(0, compulsoryServices.length).map((service, index) => (
                  <div key={index} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-3 sm:items-center">
                    <div className="flex-1">
                      <label className="block text-yellow-200 text-sm mb-1">Service Name</label>
                      <input
                        className="w-full px-3 py-2 sm:py-2 bg-yellow-900/30 border-yellow-700/60 border rounded-lg text-white font-medium"
                        type="text"
                        value={service.name}
                        readOnly
                      />
                    </div>
                    <div className="sm:w-32">
                      <label className="block text-yellow-200 text-sm mb-1">Price (₹)</label>
                      <input
                        className="w-full px-3 py-2 sm:py-2 bg-white/10 border border-yellow-700/60 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        type="number"
                        placeholder="Price"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <h4 className="text-white font-medium mt-4">Additional Custom Services</h4>
              
              {formData.services.slice(compulsoryServices.length).map((service, index) => {
                const actualIndex = index + compulsoryServices.length;
                return (
                  <div key={actualIndex} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <input
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="Service Name"
                      value={service.name}
                      onChange={(e) => handleServiceChange(actualIndex, 'name', e.target.value)}
                      required
                    />
                    <div className="flex gap-2">
                      <input
                        className="flex-1 sm:w-32 px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="number"
                        placeholder="Price"
                        value={service.price}
                        onChange={(e) => handleServiceChange(actualIndex, 'price', e.target.value)}
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => removeService(actualIndex)}
                        className="px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg transition duration-200 flex items-center justify-center"
                        aria-label="Delete service"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <button
                type="button"
                onClick={addService}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 flex items-center justify-center mt-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Custom Service
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition duration-200"
            >
              Register Shop
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterShop;
