// components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const MPrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("tokenMagang");

  return isAuthenticated ? children : <Navigate to="/masukam" />;
};

export default MPrivateRoute;
