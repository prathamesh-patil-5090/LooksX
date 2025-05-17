import React, { useState, useRef } from 'react';
// Remove direct import of emailjs
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import contactBg from '../assets/img/contact.avif';
import { sendContactFormEmail } from '../services/emailService'; // Import the new service

const Contact = () => {
  const form = useRef(); // This ref is no longer strictly needed by emailjs.send but can be kept for general form handling if desired
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });

    try {
      await sendContactFormEmail(formData);
      setSubmitStatus({ success: true, message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error sending contact form:', error);
      setSubmitStatus({ success: false, message: error.message || 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }

    // No redirect, no reload, just show status
    return false;
  };

  const contactInfo = [
    { icon: <FaPhone />, title: 'Phone', content: '+1 234 567 8900' },
    { icon: <FaEnvelope />, title: 'Email', content: 'info@looksx.com' },
    { icon: <FaMapMarkerAlt />, title: 'Location', content: '1234 Street Name, City, State' },
    { icon: <FaClock />, title: 'Working Hours', content: 'Mon - Sat: 9AM to 8PM' }
  ];

  return (
    <div className="flex flex-col items-center w-full bg-[#1A1F2C] pt-10 sm:pt-20 overflow-hidden h-full">
      {/* Hero Banner */}
      <div 
        className="relative w-full h-[12vh] sm:h-[25vh] bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${contactBg})`,
          backgroundPosition: 'center 25%'
        }}
      >
        <div className="absolute inset-0 bg-[#1A1F2C]/80"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="container mx-auto px-2 max-w-5xl">
            <h1 className="text-xl sm:text-5xl font-bold text-[#D4B86A] mb-0.5 sm:mb-4">Contact Us</h1>
            <p className="text-gray-300 mx-auto text-xs sm:text-lg line-clamp-2 sm:line-clamp-none">
              We're here to answer any questions you may have about our services.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white/5 p-2 sm:p-6 rounded-lg backdrop-blur-sm border border-gray-800">
            <h2 className="text-base sm:text-2xl font-bold text-[#D4B86A] mb-1.5 sm:mb-6">Send us a Message</h2>
            <form ref={form} onSubmit={handleSubmit} className="space-y-1.5 sm:space-y-5"> {/* Add ref={form} */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 sm:gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-2 sm:px-4 py-1 sm:py-3 bg-[#1A1F2C]/50 border border-gray-700 rounded focus:outline-none
                             focus:border-[#D4B86A] text-gray-300 placeholder-gray-400 text-xs sm:text-base"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-2 sm:px-4 py-1 sm:py-3 bg-[#1A1F2C]/50 border border-gray-700 rounded focus:outline-none
                             focus:border-[#D4B86A] text-gray-300 placeholder-gray-400 text-xs sm:text-base"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-2 sm:px-4 py-1 sm:py-3 bg-[#1A1F2C]/50 border border-gray-700 rounded focus:outline-none
                           focus:border-[#D4B86A] text-gray-300 placeholder-gray-400 text-xs sm:text-base"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={2}
                placeholder="Message"
                className="w-full px-2 sm:px-4 py-1 sm:py-3 bg-[#1A1F2C]/50 border border-gray-700 rounded focus:outline-none
                           focus:border-[#D4B86A] text-gray-300 placeholder-gray-400 text-xs sm:text-base"
                required
              />
              <div className="flex justify-center sm:justify-start items-center">
                <button
                  type="submit"
                  className="px-4 sm:px-8 py-1 sm:py-3 bg-[#D4B86A] text-[#1A1F2C] font-semibold rounded hover:bg-[#D4B86A]/90
                           transition-colors duration-300 text-xs sm:text-base disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus.message && (
                  <p className={`ml-4 text-xs sm:text-sm ${submitStatus.success ? 'text-green-400' : 'text-red-400'}`}>
                    {submitStatus.message}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 sm:space-y-4">
            <div className="bg-white/5 p-2 sm:p-6 rounded-lg backdrop-blur-sm border border-gray-800">
              <h3 className="text-sm sm:text-xl font-bold text-[#D4B86A] mb-1 sm:mb-4">Find Us</h3>
              <div className="grid grid-cols-2 gap-1 sm:block">
                {contactInfo.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-1 sm:space-x-3 mb-1 sm:mb-4 last:mb-0">
                    <div className="p-1 sm:p-3 bg-[#D4B86A]/10 rounded-lg">
                      <div className="text-[#D4B86A] text-xs sm:text-xl">{item.icon}</div>
                    </div>
                    <div>
                      <h4 className="text-[#D4B86A] font-medium mb-0 sm:mb-1 text-xs sm:text-base">{item.title}</h4>
                      <p className="text-gray-400 text-xs sm:text-base line-clamp-1 sm:line-clamp-none">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white/5 p-2 sm:p-6 rounded-lg backdrop-blur-sm border border-gray-800">
              <h3 className="text-sm sm:text-xl font-bold text-[#D4B86A] mb-1 sm:mb-4">Location</h3>
              <div className="rounded-lg overflow-hidden h-20 sm:h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.908289503994!2d72.84961427515697!3d19.02227108218127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf21727f6d8f%3A0x0!2zMTnCsDAxJzIwLjIiTiA3MsKwNTEnMDguNiJF!5e0!3m2!1sen!2sin!4v1690135327016!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
