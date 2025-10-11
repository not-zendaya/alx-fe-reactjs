import React from "react";
import { Navigate } from "react-router-dom";

const useAuth = () => {
    const user = {loggedIn : true};
    return user && user.loggedIn;
}

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
