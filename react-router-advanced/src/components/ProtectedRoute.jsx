import React from "react";
import { Navigate } from "react-router-dom";

// Simulated authentication check
const isAuthenticated = () => {
  // You can change this to false to test redirection
  return true;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
