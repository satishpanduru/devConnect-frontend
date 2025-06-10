import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditProfile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    skills: '',
    githubUrl: ''
  });
  const [loading, setLoading] = useState(false);

  // Populate the form with existing user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        skills: user.skills ? user.skills.join(', ') : '',
        githubUrl: user.githubUrl || ''
      });
    }
  }, [user]);

  const { name, bio, location, skills, githubUrl } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
   
    // Convert skills from string to array
    const updatedProfile = {
      ...formData,
      skills: skills.split(',').map(skill => skill.trim()).filter(skill => skill)
    };

    try {
      const success = await updateProfile(updatedProfile);
      
      if (success) {
        setAlert({ type: 'success', message: 'Profile updated successfully' });
        setTimeout(() => {
          navigate('/profile');
        }, 300);
      }

       console.log('Updating profile with:', updatedProfile);
    } catch (error) {
      setAlert({ 
        type: 'danger', 
        message: 'Error updating profile. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  if(!user){
    return <p>Loading user data...</p>
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's update your profile information
      </p>
      
      {alert && (
        <div className={`alert alert-${alert.type}`}>{alert.message}</div>
      )}

      <form className="form" onSubmit={handleSubmit}>
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
          <textarea
            placeholder="A short bio about yourself"
            name="bio"
            value={bio}
            onChange={handleChange}
          ></textarea>
          <small className="form-text">Tell us about yourself</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={handleChange}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Skills"
            name="skills"
            value={skills}
            onChange={handleChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="GitHub URL"
            name="githubUrl"
            value={githubUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-1" disabled={loading}>
          {loading ? 'Updating...' : 'Save Changes'}
        </button>
      </form>
    </section>
  );
};

export default EditProfile;
