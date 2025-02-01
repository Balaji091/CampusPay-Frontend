import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL params
  const navigate = useNavigate(); // For programmatic navigation
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error('Please enter a new password!', { position: 'top-right', autoClose: 3000 });
      return;
    }

    setLoading(true);

    try {
      const apiUrl = `http://localhost:5001/api/user/auth/reset-password/${token}`; // Ensure the URL is correct
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Password reset successfully!', { position: 'top-right', autoClose: 3000 });
        
        // Redirect to the login page after successful reset
        setTimeout(() => {
          navigate('/user/login'); // Redirects to login page
        }, 1000); // Give enough time for the toast to be displayed before redirect
      } else {
        toast.error(data.message || 'Failed to reset password!', { position: 'top-right', autoClose: 3000 });
      }
    } catch (error) {
      toast.error('Something went wrong! Please try again.', { position: 'top-right', autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="newPassword"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md"
            disabled={loading}
          >
            {loading ? <span className="spinner-border" /> : 'Reset Password'}
          </button>
        </form>
      </div>
      <ToastContainer /> {/* Ensures toasts are rendered */}
    </div>
  );
};

export default ResetPassword;
