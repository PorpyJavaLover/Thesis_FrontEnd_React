import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = () => {
  const role = localStorage.getItem("role");
  return role === " " ? <Outlet /> : <Navigate to="/login" />;
};
