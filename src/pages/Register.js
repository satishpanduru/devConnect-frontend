import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [alert, setAlert] = useState(null);
  
  const { register, isAuthenticated, error } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/feed');
    }
    
    if (error) {
      setAlert({ type: 'danger', message: error });
    }
  }, [isAuthenticated, navigate, error]);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Passwords do not match' });
      return;
    }
    
    const success = await register({ name, email, password });
    
    if (success) {
      navigate('/edit-profile');
    }
  };

  return (
    <section className="auth-container">
      <h1>Sign Up</h1>
      <p>
        <i className="fas fa-user"></i> Create Your Account
      </p>
      
      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <small className="form-text">
            This site uses Gravatar. If you want a profile image, use a Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength="6"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

export default Register;