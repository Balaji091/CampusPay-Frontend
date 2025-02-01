import React from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaPhone } from 'react-icons/fa';

function Contact() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Header */}
        {/* <h1 className="text-3xl font-semibold text-gray-900 mb-6">Contact Us</h1> */}
        <h2 className="text-lg text-gray-700 mb-8">
          If you have any queries, feel free to contact us through the following channels
        </h2>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 py-8">
          {/* WhatsApp Icon */}
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <button className="p-4 rounded-full bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out text-white shadow-lg transform hover:scale-105">
              <FaWhatsapp size={28} />
            </button>
          </a>

          {/* Phone Call Icon */}
          <a href="tel:+1234567890" target="_blank" rel="noopener noreferrer">
            <button className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out text-white shadow-lg transform hover:scale-105">
              <FaPhone size={28} />
            </button>
          </a>

          {/* Facebook Icon */}
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <button className="p-4 rounded-full bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out text-white shadow-lg transform hover:scale-105">
              <FaFacebook size={28} />
            </button>
          </a>

          {/* Instagram Icon */}
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <button className="p-4 rounded-full bg-pink-500 hover:bg-pink-600 transition duration-300 ease-in-out text-white shadow-lg transform hover:scale-105">
              <FaInstagram size={28} />
            </button>
          </a>
        </div>
        
        {/* Optional footer */}
        <div className="mt-8">
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            We are here to assist you with any inquiries. Connect with us through the above channels for quick support.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
