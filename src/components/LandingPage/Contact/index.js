import React from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <section  id="contact" className="py-16 bg-gray-90 ">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h1 className="text-2xl  text-left  text-red-600 ml-8 mb-6">
          Contact Us
        </h1>
      

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* WhatsApp */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl transition transform hover:scale-105">
            <FaWhatsapp size={40} className="text-green-500 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">WhatsApp</h2>
            <p className="text-sm text-gray-500 mb-4">Chat with us instantly</p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-semibold hover:underline"
            >
              Message Now
            </a>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl transition transform hover:scale-105">
            <FaPhone size={40} className="text-blue-500 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">Call Us</h2>
            <p className="text-sm text-gray-500 mb-4">Available 9 AM - 6 PM</p>
            <a href="tel:+1234567890" className="text-blue-600 font-semibold hover:underline">
              +123 456 7890
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl transition transform hover:scale-105">
            <FaEnvelope size={40} className="text-red-500 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">Email Us</h2>
            <p className="text-sm text-gray-500 mb-4">We respond within 24 hours</p>
            <a href="mailto:support@example.com" className="text-red-600 font-semibold hover:underline">
              support@example.com
            </a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mt-12">
          {/* Facebook */}
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <button className="p-4 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-lg transform hover:scale-110 transition">
              <FaFacebook size={28} />
            </button>
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <button className="p-4 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg transform hover:scale-110 transition">
              <FaInstagram size={28} />
            </button>
          </a>
        </div>

        {/* Footer Text */}
        <div className="mt-8">
          <p className="text-sm text-gray-600">
            We're happy to assist you. Connect with us anytime!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
