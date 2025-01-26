import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ClipLoader from 'react-spinners/ClipLoader';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setErrorMessage('Please fill in both fields');
        return;
      }

      setLoading(true); // Start loading
      const apiUrl = 'http://localhost:5001/api/user/auth/login';
      const userDetails = { email, password };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok) {
        Cookies.set('jwtToken', data.jwtToken, { expires: 3 });
        navigate('/user/profile');
      } else {
        setLoginStatus(data.message);
      }

      setEmail('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className={`h-screen flex flex-col lg:flex-row ${loading ? 'filter blur-sm' : ''}`}>
      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <ClipLoader color="#2563eb" size={50} />
        </div>
      )}

      {/* Image Section */}
      <div className="w-full lg:w-1/2 bg-white flex justify-center items-center p-4">
        <img
          src="/login_avatar.avif"
          alt="Login Avatar"
          className="w-3/4 h-auto object-contain lg:w-full lg:h-full"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Login</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 pb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <p className="text-sm text-blue-600 cursor-pointer hover:text-red-500">Forgot password?</p>
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 w-full rounded-md hover:bg-blue-700" disabled={loading}>
            Login
          </button>
          {loginStatus && <p className="text-red-500 text-left mt-4">*{loginStatus}</p>}
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:text-red-500"
              onClick={() => navigate('/user/signup')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
