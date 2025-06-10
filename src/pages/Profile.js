import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, loading, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="profile-container">
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <Link to="/edit-profile" className="btn btn-primary">
          <i className="fas fa-user-edit"></i> Edit Profile
        </Link>
      </div>

      <div className="card profile">
        <div className="profile-grid">
          <div className="profile-top">
            <h2>{user.name}</h2>
            <p className="lead">{user.bio || 'No bio added yet'}</p>
            <p>{user.location || 'Location not specified'}</p>

            {user.githubUrl && (
              <div className="profile-github">
                <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                  <i className="fab fa-github"></i> GitHub
                </a>
              </div>
            )}
          </div>

          <div className="profile-about">
            <h2>Skills</h2>
            <div className="skills">
              {user.skills && user.skills.length > 0 ? (
                <div className="skill-tags">
                  <p>
                    {user.skills.map((skill, index) => (
                      <span key={index}>
                        {skill}{index !== user.skills.length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                </div>
              ) : (
                <p>No skills added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
