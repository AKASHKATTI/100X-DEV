import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  // If there's no token, redirect the user to the sign-in page
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

export default ProtectedRoute;