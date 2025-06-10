import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const res = await api.getAllUsers();
        console.log('Fetched profiles:', res.data);
        setProfiles(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError('Failed to load developer profiles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <section className="container">
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>
      
      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center my-3">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="profiles">
          {profiles.length > 0 ? (
            profiles.map(profile => (
              <div key={profile.id} className="card profile-item">
                <div className="profile-info">
                  <div>
                    <h2>{profile.name}</h2>
                    <p>{profile.bio || 'No bio provided'}</p>
                    <p className="my-1">{profile.location || 'Location not specified'}</p>
                    
                    {profile.skills && profile.skills.length > 0 && (
                      <div className="skills">
                        {profile.skills.map((skill, index) => (
                          <span key={index} className="badge bg-primary me-1">
                            {skill}{index < profile.skills.length - 1 ? ',': ' '}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {profile.githubUrl && (
                      <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark my-1">
                        <i className="fab fa-github"></i> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No profiles found...</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Profiles;