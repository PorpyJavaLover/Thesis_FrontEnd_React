import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const PublicRoute = () => {
  const user = localStorage.getItem("user");
  return !user ? <Outlet /> : <Navigate to="/" />;
};
export default PublicRoute;
