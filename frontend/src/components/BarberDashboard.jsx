import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

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

const BarberDashboard = () => {
  const { user, token } = useUser();
  const [appointments, setAppointments] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserInfo(user);
        const response = await axios.get(
          'http://localhost:8800/api/barber/appointments',
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
  }, [user, token]);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    setUpdateLoading(true);
    setUpdateError('');
    setSuccessMessage('');
    
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      // Verify if user is a barber and has a shop
      if (!user || user.role !== 'barber' || !user.shopName) {
        throw new Error('Unauthorized - Must be a barber with a registered shop');
      }

      console.log('Attempting update:', {
        appointmentId,
        shopName: user.shopName,
        newStatus
      });

      // Use the new unified endpoint
      const response = await axios({
        method: 'PATCH',
        url: `http://localhost:8800/api/appointments/${appointmentId}/status`,
        data: { status: newStatus },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('PATCH response:', response.data); // Debug log

      // Refresh appointments after successful update
      const updatedAppointments = await axios.get(
        'http://localhost:8800/api/barber/appointments',
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      setAppointments(updatedAppointments.data);
      setSuccessMessage(`Appointment ${newStatus} successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating appointment:', err); // Debug log
      setUpdateError(
        err.response?.data?.message || 
        'Failed to update appointment. Please verify you own this appointment.'
      );
      setTimeout(() => setUpdateError(''), 3000);
    } finally {
      setUpdateLoading(false);
    }
  };

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
      <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-16">
        {/* Show success message */}
        {successMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg text-sm md:text-base">
            {successMessage}
          </div>
        )}
        
        {/* Show update error */}
        {updateError && (
          <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg text-sm md:text-base">
            {updateError}
          </div>
        )}
        
        <div className="space-y-4 md:space-y-8">
          {/* Shop Info Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-8 mt-6 md:mt-12">
            <h2 className="text-xl md:text-3xl font-bold text-white text-center mb-2 md:mb-4">
              {userInfo?.shopName || 'Your Barbershop'}
            </h2>
            <p className="text-gray-300 text-center text-base md:text-lg">Barber: {userInfo?.username}</p>
          </div>

          {/* Appointments Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-8">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Upcoming Appointments</h3>
            {appointments.length === 0 ? (
              <p className="text-gray-300 text-center">No appointments scheduled.</p>
            ) : (
              <div className="grid gap-3 md:gap-4">
                {appointments.map((apt) => {
                  const datetime = formatDateTime(apt.appointmentDate);
                  return (
                    <div key={apt._id} className="bg-white/5 rounded-lg p-3 md:p-6 hover:bg-white/10 transition-all">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-0">
                        <div className="space-y-1 md:space-y-2">
                          <h4 className="text-white font-semibold text-base md:text-lg">Client: {apt.name}</h4>
                          <p className="text-gray-300 text-sm md:text-base">Service: {apt.service}</p>
                          <p className="text-gray-300 text-sm md:text-base">Date: {datetime.date}</p>
                          <p className="text-gray-300 text-sm md:text-base">Time: {datetime.time}</p>
                          <p className="text-gray-300 text-sm md:text-base">Address: {apt.address}</p>
                        </div>
                        <div className="flex flex-row md:flex-col justify-between items-center md:items-end md:space-y-2">
                          <span className={`${getStatusColor(apt.status)} px-3 py-1 md:px-4 md:py-2 rounded-full text-white text-xs md:text-sm`}>
                            {apt.status || 'pending'}
                          </span>
                          <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 md:mt-4">
                            <button
                              onClick={() => handleStatusUpdate(apt._id, 'confirmed')}
                              disabled={updateLoading || apt.status === 'confirmed'}
                              className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm ${
                                updateLoading 
                                  ? 'bg-gray-500'
                                  : apt.status === 'confirmed'
                                    ? 'bg-green-700'
                                    : 'bg-green-500 hover:bg-green-600'
                              } text-white rounded-lg transition-colors`}
                            >
                              {updateLoading ? 'Updating...' : 'Confirm'}
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(apt._id, 'cancelled')}
                              disabled={updateLoading || apt.status === 'cancelled'}
                              className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm ${
                                updateLoading 
                                  ? 'bg-gray-500'
                                  : apt.status === 'cancelled'
                                    ? 'bg-red-700'
                                    : 'bg-red-500 hover:bg-red-600'
                              } text-white rounded-lg transition-colors`}
                            >
                              {updateLoading ? 'Updating...' : 'Cancel'}
                            </button>
                          </div>
                        </div>
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

export default BarberDashboard;
