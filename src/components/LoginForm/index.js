import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try{
          e.preventDefault();
          if (!email || !password) 
          {
              setErrorMessage('Please fill in both fields');
              return;
          }
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
          if (response.ok === true) {
            Cookies.set('jwtToken', data.jwtToken, { expires: 3 });
            navigate('/user/home');
          } else {
            setLoginStatus(data.message);
            console.log(loginStatus)
          }

          setEmail('');
          setPassword('');
          setErrorMessage('');
  }
  catch(e){
    console.log(e);
  }
  };

  return (
    <div className="h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Login</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="w-3/4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 pb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 input input-bordered w-full focus:outline-none focus:border-blue-400 hover:border-blue-300"
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
              className="mt-2 input input-bordered w-full focus:outline-none focus:border-blue-400 hover:border-blue-300"
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
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
          {loginStatus && <p className="text-red-500  text-left mb-4">*{loginStatus}</p>}
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:text-red-500 "
              onClick={() => navigate('/user/signup')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <img
          src="/login_avatar.avif"
          alt="Login Avatar"
          className="w-3/4 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default LoginForm;
