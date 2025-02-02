import React, { useState, useEffect } from "react";
import { FiMenu, FiHome, FiUsers, FiDollarSign, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const SideNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsCollapsed(false); // Ensure it's expanded on desktop
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-100 h-full fixed top-0 left-0 transition-all duration-300 ${
          isMobile ? "w-16" : isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Toggle Button (Desktop Only) */}
        <div className="p-4 flex items-center justify-between">
          <button className="text-2xl text-primary focus:outline-none">
            <FiMenu />
          </button>
          {!isCollapsed && (
            <h1 className="text-lg font-bold pr-28 text-primary hidden md:block">
              Admin
            </h1>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4">
          <ul className="menu p-2">
            {[
              { icon: <FiHome size={20} />, label: "Dashboard", to: "/admin/dashboard" },
              { icon: <FiUsers size={20} />, label: "Students", to: "/admin/students" },
              { icon: <FiDollarSign size={20} />, label: "Payments", to: "/admin/payments" },
              { icon: <FiSettings size={20} />, label: "Settings", to: "/adminsettings" },
            ].map((item, index) => (
              <li key={index} className="relative group">
                <Link to={item.to} className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary hover:text-white group">
                  {/* Icon */}
                  <div>{item.icon}</div>  

                  {/* Label */}
                  <span className={`text-sm ${isMobile || isCollapsed ? "hidden" : "inline"}`}>
                    {item.label}
                  </span>
                </Link>

                {/* Tooltip for Mobile View */}
                {isMobile && (
                  <span className="absolute left-16 top-0 px-2 py-1 text-sm bg-gray-800 text-gray-200 rounded-lg opacity-0 group-hover:opacity-100 z-10">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64"> {/* Adjust this to give space for the fixed sidebar */}
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default SideNavBar;
