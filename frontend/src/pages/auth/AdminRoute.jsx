import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "recruiter") return <Navigate to="/unauthorized" replace />;

  return children ? children : <Outlet />;
};

export default AdminRoute;



