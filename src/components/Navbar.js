import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const guestLinks = (
    <>
      <li>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
      </li>
      <li>
        <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
      </li>
    </>
  );

  const authLinks = (
    <>
      {/* <li>
        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
      </li> */}
      <li>
        <Link to="/profiles" onClick={() => setMenuOpen(false)}>Developers</Link>
      </li>
      <li>
        <Link to="/profile" onClick={() => setMenuOpen(false)}>My Profile</Link>
      </li>
      <li>
        <a href="#!" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnect
        </Link>
      </h1>
      <button className="navbar-toggle" onClick={toggleMenu}>
        <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
      <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

export default Navbar;
