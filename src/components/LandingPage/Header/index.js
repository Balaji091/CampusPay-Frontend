import React, { useState, useEffect } from 'react';
import './index.css'
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-all ${
        isScrolled ? 'shadow-lg bg-blue-50' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">CampusPay</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex   h-150 space-x-8">
          <a
            href="#home"
            className="text-gray-700 hover:text-blue-600  pt-3 font-medium"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-blue-600 pt-3  font-medium"
          >
            About
          </a>
          <a
            href="#features"
            className="text-gray-700 hover:text-blue-600  pt-3  font-medium"
          >
            Features
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-blue-600  pt-3  font-medium"
          >
            Contact
          </a>
          <a href="#login">
            <button className="px-4 py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600">
              Login
            </button>
          </a>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-2xl md:hidden focus:outline-none text-blue-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Left Drawer for Mobile */}
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 h-full w-64  bg-white shadow-lg z-40 p-4 transition-transform transform duration-300 ease-in-out"
        >
          <button
            className="absolute top-4 right-4 text-2xl text-gray-700"
            onClick={() => setIsMenuOpen(false)}
          >
            &times;
          </button>
          <nav className="flex flex-col space-y-4">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <a href="#login">
              <button className="px-4 py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600">
                Login
              </button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
