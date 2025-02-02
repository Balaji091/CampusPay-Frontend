import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        toast.error('Please enter both username and password!', { position: 'top-right', autoClose: 3000 });
        return;
      }

      setLoading(true);
      const apiUrl = 'http://localhost:5001/api/admin/login';
      const adminDetails = { username, password };
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminDetails),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('adminJwtToken', data.jwtToken, { expires: 3 });

        // Hide the loader before navigating
        setLoading(false);

        // Navigate to Admin Dashboard
        navigate('/admin/dashboard'); 
      } else {
        setLoading(false);
        toast.error(data.message || 'Invalid login credentials', { position: 'top-right', autoClose: 3000 });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Something went wrong! Please try again.', { position: 'top-right', autoClose: 3000 });
    }
  };

  return (
    <div className={`h-screen flex flex-col lg:flex-row ${loading ? 'filter blur-sm' : ''}`}>
     
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <ClipLoader color="#2563eb" size={50} />
        </div>
      )}

      {/* Image Section */}
      <div className="w-full lg:w-1/2 bg-white flex justify-center items-center p-4">
        <img
          src="https://projectsly.com/images/task-management-screenshot-1.png?v=1691124479409199525"
          alt="Admin Login Avatar"
          className="w-3/4 h-auto object-contain lg:w-full lg:h-full"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Admin Login</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="username" className="block text-left text-sm font-medium text-gray-700 pb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-2 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 w-full rounded-md hover:bg-blue-700" disabled={loading}>
            Login
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AdminLoginForm;
