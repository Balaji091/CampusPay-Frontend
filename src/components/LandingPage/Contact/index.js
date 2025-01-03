import React from 'react';

const Contact = () => {
  return (
    <div  id="contact"className="bg-gray-50 py-16 mt-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl pb-4 text-left text-blue-600 ">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-center">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
           
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm  text-left font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input input-bordered  w-full mt-1"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm  text-left font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm  text-left  font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="textarea textarea-bordered w-full mt-1"
                  rows="4"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full text-white bg-blue-600 hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Information
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Have questions or need assistance? Feel free to reach out to us.
            </p>
            <div className="mt-6 space-y-4">
              <p className="text-lg text-gray-800">
                📍 <span className="font-medium">Address:</span> 123 Campus Lane, Education City, CA 90000
              </p>
              <p className="text-lg text-gray-800">
                📞 <span className="font-medium">Phone:</span> +1 (123) 456-7890
              </p>
              <p className="text-lg text-gray-800">
                ✉️ <span className="font-medium">Email:</span> support@campuspay.com
              </p>
              <p className="text-lg text-gray-800">
                ⏰ <span className="font-medium">Hours:</span> Mon - Fri: 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
