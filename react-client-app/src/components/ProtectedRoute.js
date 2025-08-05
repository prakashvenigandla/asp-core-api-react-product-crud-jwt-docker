import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const ProtectedRoute = ({ children }) => {
  const token = AuthService.getToken();
  if (!token) {
    return <Navigate to="/login"  />;
  }
  return children;
};

export default ProtectedRoute;
