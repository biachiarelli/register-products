import React from 'react';
import { Navigate } from 'react-router-dom';
import './index.scss';
import Navbar from '../Navbar';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedRoute;
