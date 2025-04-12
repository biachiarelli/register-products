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
      <Sidebar />
      <Navbar />
      {children}
    </div>
  );
};


export default ProtectedRoute;
