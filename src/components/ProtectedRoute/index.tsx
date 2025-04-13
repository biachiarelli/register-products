import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import './index.scss';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <div className="container-sidebar">
        <Sidebar />
      </div>
      <div className="container-navbar">
        <Navbar />
      </div>
      <div className="container-body">{children}</div>
    </div>
  );
};

export default ProtectedRoute;
