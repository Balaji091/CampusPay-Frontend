import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
function HeaderComponent() {
  return (
    <div className="navbar bg-white shadow-md px-6">
      <div className="flex-1">
        <a className="text-xl font-bold text-gray-800">CampusPay</a>
      </div>
      <div className="flex items-center space-x-6">
        
       <Link to="/user/payments" className="text-gray-700 hover:text-blue-600">Payments</Link> 
       <Link to="/user/paymentsHistory" className="text-gray-700 hover:text-blue-600">History</Link>
       <Link to="/user/addpayment"  className="text-gray-700 hover:text-blue-600">New Payment</Link>
        <Link to="/user/profile"><FaUserCircle className="text-gray-500 text-2xl" /></Link>
      </div>
    </div>
  );
}

export default HeaderComponent;
