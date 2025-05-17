import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Register = () => {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:8800/api/auth/register', formData);
      
      // Use context login instead of localStorage
      login(response.data, response.data.token);

      // If user is a barber, redirect to shop registration
      if (formData.role === 'barber') {
        navigate('/register-shop');
      } else {
        navigate('/'); // Changed from '/customer-dashboard' to '/' for customer registration
      }
    } catch (err) {
      // Display more specific error from backend if available
      const specificError = err.response?.data?.error;
      const generalMessage = err.response?.data?.message;
      setError(specificError || generalMessage || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1A1F2C] to-[#2C3345]">
      <div className="w-full max-w-md mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Register</h2>
          {error && <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="customer" className="bg-[#1A1F2C] text-white">Customer</option>
                <option value="barber" className="bg-[#1A1F2C] text-white">Barber</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition duration-200"
            >
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
