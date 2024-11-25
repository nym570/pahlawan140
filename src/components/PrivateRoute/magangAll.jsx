// components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const MRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("tokenMagang");

  return isAuthenticated ? <Navigate to="/berandamasuk" /> : children;
};

export default MRoute;
