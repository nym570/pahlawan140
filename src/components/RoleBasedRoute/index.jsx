import React from "react";
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = localStorage.getItem("loginSuccess");
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />; // Or some other page indicating unauthorized access
  }

  return children;
};

export default RoleBasedRoute;