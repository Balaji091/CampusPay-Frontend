import React from 'react';
import './about.module.css';

const About = () => {
  return (
    <div id="about" className="bg-gray-50 py-8">  {/* Background applied here */}
      <h1 className="text-2xl  text-left  text-red-600 ml-8 mb-6">
        About Us
      </h1>
      <div className="hero px-4 sm:px-8"> {/* Responsive padding */}
        <div className="hero-content flex flex-col lg:flex-row  lg:items-start">
          {/* Image Section */}
          <img
            src="/about3.png"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-lg shadow-sm mb-6 lg:mb-0"
            alt="College Campus"
          />

          {/* Text Section */}
          <div className="lg:ml-10 sm:text-left lg:text-left max-w-xl">
            <p className="py-2 text-base sm:text-lg leading-relaxed text-gray-600">
              At CampusPay, we are dedicated to transforming how educational institutions manage their fees.
              Our cutting-edge web application ensures a seamless process for students, parents, and administrators.
              Experience the convenience of accurate fee tracking, automated receipt validation, and real-time reporting,
              all in one easy-to-use platform.
            </p>
            <p className="py-2 text-base sm:text-lg leading-relaxed text-gray-600">
              Designed to enhance transparency and efficiency, our system reduces manual effort and improves accuracy,
              allowing institutions to focus on delivering quality education.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
