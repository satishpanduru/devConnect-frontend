import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // If authentication is still loading, show a loading indicator
  if (loading) {
    return (
      <div className="container">
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child component(s)
  return children;
};

export default PrivateRoute;