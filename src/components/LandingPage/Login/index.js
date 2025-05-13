import React from 'react';
import { RiAdminLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate=useNavigate();
  return (
    <div  id="login"className="bg-gray-50  flex flex-col justify-start items-start pl-8 pr-8 pt-8">
      <h1 className="text-2xl  text-left  text-red-600 mb-6">
        Choose Your Login
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Student Login */}
        <div
          onClick={()=>navigate('/user/login')}
          className="bg-green-100  hover:bg-green-200 text-green-700 rounded-lg shadow-lg p-8 flex flex-col items-center cursor-pointer transition duration-300 transform hover:scale-105"
        >
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-2xl font-bold">Student Login</h2>
          <p className="mt-2 text-gray-600 text-center">
            Access your dashboard to manage fees and more.
          </p>
        </div>

        {/* Admin Login */}
        <div
          onClick={()=>navigate('/admin/login')}
          className="bg-red-100 hover:bg-red-200 text-red-700 rounded-lg shadow-lg p-8 flex flex-col items-center cursor-pointer transition duration-300 transform hover:scale-105"
        >
          <div className="text-6xl mb-4"><RiAdminLine /></div>
          <h2 className="text-2xl font-bold">Admin Login</h2>
          <p className="mt-2 text-gray-600 text-center">
            Manage student records and payments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
