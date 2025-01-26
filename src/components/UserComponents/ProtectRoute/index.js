import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("jwtToken"); // Check if token exists in cookies

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/user/login" />;
  }

  return children; // Render the children (protected route content) if token exists
};

export default ProtectedRoute;
