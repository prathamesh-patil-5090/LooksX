import React from 'react';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#1A1F2C] to-[#2C3345] pt-16 sm:pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-[#D4B86A] text-center text-xl font-semibold">Please login to view your profile.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1A1F2C] to-[#2C3345] pt-16 sm:pt-20">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-2xl mx-auto">
          {/* Decorative header */}
          <div className="text-center mb-4 sm:mb-8">
            <div className="inline-block">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#D4B86A]"></div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#D4B86A] px-2 sm:px-4">Profile</h2>
                <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#D4B86A]"></div>
              </div>
              <div className="text-xs sm:text-sm text-[#D4B86A]/60 uppercase tracking-widest">Member Information</div>
            </div>
          </div>

          {/* Main content card */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-2xl p-4 sm:p-8 border border-[#D4B86A]/20">
            {/* Profile section */}
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center justify-center mb-4 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#D4B86A] to-[#F0C987] flex items-center justify-center text-[#1A1F2C] text-xl sm:text-2xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="p-3 sm:p-4 bg-[#D4B86A]/5 rounded-lg border border-[#D4B86A]/10">
                  <label className="block text-[#D4B86A] text-xs sm:text-sm font-medium mb-1 sm:mb-2">Username</label>
                  <p className="text-white text-base sm:text-lg font-semibold">{user.username}</p>
                </div>

                <div className="p-3 sm:p-4 bg-[#D4B86A]/5 rounded-lg border border-[#D4B86A]/10">
                  <label className="block text-[#D4B86A] text-xs sm:text-sm font-medium mb-1 sm:mb-2">Email</label>
                  <p className="text-white text-base sm:text-lg font-semibold">{user.email}</p>
                </div>
              </div>

              {/* Shop information for barbers */}
              {user.role === 'barber' && user.shop && (
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#D4B86A]/20">
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#D4B86A]">Shop Information</h3>
                    <div className="h-px w-20 sm:w-24 bg-[#D4B86A]/20 mx-auto mt-3 sm:mt-4"></div>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="p-3 sm:p-4 bg-[#D4B86A]/5 rounded-lg border border-[#D4B86A]/10">
                      <label className="block text-[#D4B86A] text-xs sm:text-sm font-medium mb-1 sm:mb-2">Shop Name</label>
                      <p className="text-white text-base sm:text-lg font-semibold">{user.shop.name}</p>
                    </div>
                    
                    <div className="p-3 sm:p-4 bg-[#D4B86A]/5 rounded-lg border border-[#D4B86A]/10">
                      <label className="block text-[#D4B86A] text-xs sm:text-sm font-medium mb-1 sm:mb-2">Address</label>
                      <p className="text-white text-base sm:text-lg font-semibold">
                        {user.shop.address.street},<br />
                        {user.shop.address.city}, {user.shop.address.state} {user.shop.address.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Decorative footer */}
          <div className="flex items-center justify-center mt-6 sm:mt-8">
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D4B86A]/40"></div>
            <div className="px-3 sm:px-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4B86A]/40" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D4B86A]/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
