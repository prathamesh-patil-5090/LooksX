import emailjs from 'emailjs-com';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_OWNER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_OWNER;
const TEMPLATE_ID_USER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_USER;
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

export const sendContactFormEmail = async (formData) => {
  if (!SERVICE_ID || !TEMPLATE_ID_OWNER || !TEMPLATE_ID_USER || !USER_ID) {
    throw new Error('EmailJS configuration error. Credentials missing.');
  }

  // 1. Send email to yourself (owner)
  const ownerParams = {
    ...formData,
    to_email: "prathampatil7798@gmail.com", // Hardcoded owner email
  };

  // 2. Send auto-reply to user
  const userParams = {
    ...formData,
    to_email: formData.email, // User's email from the form
  };

  try {
    // Send email to owner
    await emailjs.send(SERVICE_ID, TEMPLATE_ID_OWNER, ownerParams, USER_ID);
    
    // Send auto-reply to user
    await emailjs.send(SERVICE_ID, TEMPLATE_ID_USER, userParams, USER_ID);
    
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('EmailJS Error:', error.text || error);
    throw new Error(`Failed to send message: ${error.text || error}. Please try again.`);
  }
};
