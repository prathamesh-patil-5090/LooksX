import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_API_URL}/api/appointments`;

export const fetchUserAppointments = async (token) => {
  try {
    const response = await axios.get(API_URL, {
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

export const updateAppointmentStatus = async (appointmentId, newStatus, token) => {
  try {
    const response = await axios.patch(
      `${API_URL}/${appointmentId}/status`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const bookNewAppointment = async (appointmentDetails, token) => {
  try {
    const response = await axios.post(API_URL, appointmentDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

// You can add other appointment-related functions here later
// e.g., cancelAppointment
