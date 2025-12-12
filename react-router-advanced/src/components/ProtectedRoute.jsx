import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // ✅ import the custom hook

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // ✅ useAuth hook

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;