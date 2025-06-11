import axios from 'axios';
import api from '../api';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // REGISTER
  const register = async (formData) => {
    try {
      const res = await api.register(formData);
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      setUser(res.data.user);
      setError(null);
      return true;
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert(JSON.stringify(err.response?.data));
      setError(err.response?.data?.message || 'Registration failed');
      setIsAuthenticated(false);
      return false;
    }
  };

  // LOGIN
  const login = async (formData) => {
    try {
      const res = await api.login(formData);
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      setUser(res.data.user); // ✅ fixed
      setError(null);
      return true;
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed');
      setIsAuthenticated(false);
      return false;
    }
  };

  // UPDATE PROFILE
  const updateProfile = async (updatedData) => {
    try {
      console.log("Sending profile update with data:", updatedData);

      const res = await api.updateProfile(updatedData); // Uses shared axios instance

      console.log('Response from backend:', res.data);
      setUser(res.data);
      setError(null);
      return true;
    } catch (err) {
      console.error('Update profile failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to update profile');
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  // AUTH CHECK ON PAGE LOAD
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.getCurrentUser(); // uses baseURL + /auth/me
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Auth check failed:', err.message);
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        updateProfile,
        isAuthenticated,
        error,
        user,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
