import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaSignOutAlt, FaMoneyCheckAlt, FaHistory, FaPlusCircle } from "react-icons/fa";
import Cookies from "js-cookie";

function HeaderComponent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Logout logic
  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/user/login");
  };

  return (
    <div className="navbar bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md px-6 text-white">
      {/* Logo Section */}
      <div className="flex-1">
        <a className="text-2xl font-bold cursor-pointer">CampusPay</a>
      </div>

      {/* Menu Icon for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Drawer for Mobile View */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
          <div className="fixed left-0 top-0 w-64 bg-white h-full shadow-lg z-30">
            <button
              className="absolute top-4 right-4 text-gray-700 text-2xl focus:outline-none"
              onClick={() => setIsDrawerOpen(false)}
            >
              &times;
            </button>
            <div className="flex flex-col items-start p-6 space-y-4 text-gray-800">
              <Link
                to="/user/payments"
                className="flex items-center w-full px-4 py-2 text-lg font-medium rounded hover:bg-blue-100"
                onClick={() => setIsDrawerOpen(false)}
              >
                <FaMoneyCheckAlt className="mr-2 text-blue-500" /> Payments
              </Link>
              <Link
                to="/user/paymentsHistory"
                className="flex items-center w-full px-4 py-2 text-lg font-medium rounded hover:bg-blue-100"
                onClick={() => setIsDrawerOpen(false)}
              >
                <FaHistory className="mr-2 text-blue-500" /> History
              </Link>
              <Link
                to="/user/addpayment"
                className="flex items-center w-full px-4 py-2 text-lg font-medium rounded hover:bg-blue-100"
                onClick={() => setIsDrawerOpen(false)}
              >
                <FaPlusCircle className="mr-2 text-green-500" /> New Payment
              </Link>
              <Link
                to="/user/profile"
                className="flex items-center w-full px-4 py-2 text-lg font-medium rounded hover:bg-blue-100"
                onClick={() => setIsDrawerOpen(false)}
              >
                <FaUserCircle className="mr-2 text-blue-500" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-lg font-medium text-left rounded hover:bg-red-100"
              >
                <FaSignOutAlt className="mr-2 text-red-500" /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links for Desktop */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/user/payments" className="flex items-center hover:text-blue-200">
          <FaMoneyCheckAlt className="mr-1" /> Payments
        </Link>
        <Link to="/user/paymentsHistory" className="flex items-center hover:text-blue-200">
          <FaHistory className="mr-1" /> History
        </Link>
        <Link to="/user/addpayment" className="flex items-center hover:text-blue-200">
          <FaPlusCircle className="mr-1" /> New Payment
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center focus:outline-none"
          >
            <FaUserCircle className="text-white text-2xl" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
              <Link
                to="/user/profile"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaUserCircle className="mr-2" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2 text-red-500" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
