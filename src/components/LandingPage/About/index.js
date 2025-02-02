import React from 'react';
import './about.module.css';

const About = () => {
  return (
    <div id="about" className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl  text-left  text-red-600 ml-8 mb-6">
          About Us
        </h1>
        <div className="hero">
          <div className="hero-content flex flex-col lg:flex-row items-start">
            {/* Image Section */}
            <img
              src="/about3.png"
              className="w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-lg shadow-lg mb-6 lg:mb-0"
              alt="College Campus"
            />

            {/* Text Section */}
            <div className="lg:ml-12 text-left max-w-xl">
              <p className="mb-4 text-base sm:text-lg md:text-xl leading-relaxed text-gray-700">
                At CampusPay, we are dedicated to transforming how educational institutions manage their fees.
                Our cutting-edge web application ensures a seamless process for students, parents, and administrators.
                Experience the convenience of accurate fee tracking, automated receipt validation, and real-time reporting,
                all in one easy-to-use platform.
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700">
                Designed to enhance transparency and efficiency, our system reduces manual effort and improves accuracy,
                allowing institutions to focus on delivering quality education.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
