import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Profiles from './pages/Profiles';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import AuthContextProvider from './context/AuthContext';
import ProfileDetails from './pages/ProfileDetails';
import './index.css';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Navbar />
        <main className="container main-content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/feed" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feed" element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/edit-profile" element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            } />
            <Route path="/profiles" element={
              <PrivateRoute>
                <Profiles />
              </PrivateRoute>
            } />
            <Route path='/profile/:userId' element={
              <PrivateRoute>
                <ProfileDetails/>
              </PrivateRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </AuthContextProvider>
  );
}

export default App;