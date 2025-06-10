import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState(null);
  
  const { login, isAuthenticated, error } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/feed');
    }
    
    if (error) {
      setAlert({ type: 'danger', message: error });
    }
  }, [isAuthenticated, navigate, error]);

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!email || !password) {
      setAlert({ type: 'danger', message: 'Please enter all fields' });
      return;
    }
    
    const success = await login({ email, password });
    
    if (success) {
      setTimeout(() => navigate('/feed'), 200);
    }
  };

  return (
    <section className="auth-container">
      <h1>Sign In</h1>
      <p>
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      
      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;