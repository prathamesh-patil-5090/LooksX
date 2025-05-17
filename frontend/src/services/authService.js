import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_API_URL}/api/auth`;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Return the response data (user object + token)
  } catch (error) {
    // Rethrow a more structured error or the original error
    if (error.response && error.response.data) {
      throw error.response.data; 
    }
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Return the response data (user object + token)
  } catch (error) {
    // Rethrow a more structured error or the original error
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

// You can add other auth-related functions here later (e.g., logoutUser)
