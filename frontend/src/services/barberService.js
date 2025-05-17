import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_API_URL}/api/barber`;

export const registerShop = async (shopData, token) => {
  try {
    const response = await axios.post(`${API_URL}/shops`, shopData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the response data (e.g., updated user with shop info)
  } catch (error) {
    // Rethrow a more structured error or the original error
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const fetchBarberAppointments = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

// You can add other barber-related functions here later
