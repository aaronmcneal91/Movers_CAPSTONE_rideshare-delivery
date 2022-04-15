import { Navigate } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  let [user] = useAuth();
  localStorage.setItem('user', JSON.stringify(user));
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
