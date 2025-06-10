import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i> Page Not Found
      </h1>
      <p className="large">Sorry, this page does not exist</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;