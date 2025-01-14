import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  
  // Check if date is invalid
  if (isNaN(date.getTime())) {
    const today = new Date();
    return {
      date: today.toLocaleDateString(),
      time: today.toLocaleTimeString()
    };
  }

  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString()
  };
};

const CustomerDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        setUserInfo(user);

        // Updated to use the new endpoint
        const response = await axios.get(
          'https://looksx-backend.onrender.com/api/appointments',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch appointments');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1A1F2C] to-[#2C3345]">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1A1F2C] to-[#2C3345]">
      <div className="text-red-400 text-xl">{error}</div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1A1F2C] to-[#2C3345]">
      <div className="w-full max-w-6xl mx-auto px-4 py-16"> {/* Added more top padding */}
        <div className="space-y-8 transform hover:scale-105 transition-transform duration-300">
          {/* User Info Section - moved down and restyled */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mt-12"> {/* Added margin top and increased padding */}
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Welcome, {userInfo?.username}</h2>
            <p className="text-gray-300 text-center text-lg">Email: {userInfo?.email}</p>
          </div>

          {/* Appointments Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Your Appointments</h3>
            {appointments.length === 0 ? (
              <p className="text-gray-300">No appointments found.</p>
            ) : (
              <div className="grid gap-4">
                {appointments.map((apt) => {
                  const datetime = formatDateTime(apt.appointmentDate);
                  return (
                    <div key={apt._id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-semibold">{apt.shopName}</h4>
                          <p className="text-gray-300">Service: {apt.service}</p>
                          <p className="text-gray-300">Date: {datetime.date}</p>
                          <p className="text-gray-300">Time: {datetime.time}</p>
                          <p className="text-gray-300">Address: {apt.address}</p>
                        </div>
                        <span className={`${getStatusColor(apt.status)} px-3 py-1 rounded-full text-white text-sm`}>
                          {apt.status || 'pending'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
