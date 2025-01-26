import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Cookies from 'js-cookie'
function HeaderComponent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Logout logic
  const handleLogout = () => {
    // Clear authentication data from localStorage or sessionStorage
    Cookies.remove("jwtToken");
   

    // Navigate to the login page
    navigate("/user/login");
  };

  return (
    <div className="navbar bg-white shadow-md px-6">
      {/* Logo Section */}
      <div className="flex-1">
        <a className="text-xl font-bold text-gray-800">CampusPay</a>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link to="/user/payments" className="text-gray-700 hover:text-blue-600">
          Payments
        </Link>
        <Link
          to="/user/paymentsHistory"
          className="text-gray-700 hover:text-blue-600"
        >
          History
        </Link>
        <Link
          to="/user/addpayment"
          className="text-gray-700 hover:text-blue-600"
        >
          New Payment
        </Link>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center focus:outline-none"
          >
            <FaUserCircle className="text-gray-500 text-2xl" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
              <Link
                to="/user/profile"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaUserCircle className="mr-2" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2 text-red-500" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
