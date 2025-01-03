import React from 'react';
import './about.module.css';

const About = () => {
  return (
    <div  id="about"className="bg-grey-50 py-8 ">  {/* Background applied here */}
      <h1 className="text-3xl  text-left text-blue-600 pl-10 mb-4 ">
        About Us
      </h1>
      <div className="hero   px-8"> {/* Applied a background color here */}
      
        <div className="hero-content flex lg:flex-row flex-col items-center lg:items-start">
       
          <img
            src="/about3.png"
            className="w-96 lg:w-1/2 rounded-lg shadow-lg"
            alt="College Campus"
          />
  
          {/* Text Section */}
          <div className="lg:ml-16 lg:mt-0 text-center lg:text-left max-w-xl">
            <p className="py-2 text-lg leading-relaxed text-gray-600">
              At CampusPay, we are dedicated to transforming how educational institutions manage their fees. 
              Our cutting-edge web application ensures a seamless process for students, parents, and administrators. 
              Experience the convenience of accurate fee tracking, automated receipt validation, and real-time reporting, 
              all in one easy-to-use platform.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
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
