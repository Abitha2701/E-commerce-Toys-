import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate, Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('mail');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:6005/profile/${userEmail}`);
        const data = await response.json();

        if (response.ok) {
          setUserData(data.user);
        } else {
          setMessage('Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Server error. Try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    if (userEmail) {
      fetchUserData();
    } else {
      setMessage('No user is logged in.');
      setIsLoading(false);
    }
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem('mail');
    alert('You have been logged out.');
    navigate('/');
  };

  const getInitials = (name, email) => {
    if (name) {
      const parts = name.trim().split(/\s+/);
      return parts.slice(0, 2).map(p => p[0]?.toUpperCase()).join('');
    }
    if (email) {
      return email[0]?.toUpperCase() || 'U';
    }
    return 'U';
  };

  const handleEditProfile = () => {
    // Placeholder for future edit functionality
    alert('Edit Profile coming soon!');
  };

  return (
    <div className="Profile">
      <div className="profile-container">
        <BackButton className="page-back" />
        <div className="profile-header">
          <div className="avatar" aria-hidden="true">
            {getInitials(userData?.name, userData?.mail)}
          </div>
          <div className="title-wrap">
            <h2>{userData?.name || 'User Profile'}</h2>
            {userData?.mail && <p className="subtitle">{userData.mail}</p>}
          </div>
        </div>

        {message && (
          <div className="alert error" role="alert">{message}</div>
        )}

        {isLoading ? (
          <div className="skeleton">
            <div className="shimmer line" />
            <div className="shimmer line" />
            <div className="shimmer line short" />
          </div>
        ) : userData ? (
          <div className="profile-content">
            <div className="info-grid">
              <div className="info-item">
                <i className="fa-solid fa-id-card icon" aria-hidden="true"></i>
                <div className="info-text">
                  <span className="label">Name</span>
                  <span className="value">{userData.name}</span>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-envelope icon" aria-hidden="true"></i>
                <div className="info-text">
                  <span className="label">Email</span>
                  <span className="value">{userData.mail}</span>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-phone icon" aria-hidden="true"></i>
                <div className="info-text">
                  <span className="label">Phone</span>
                  <span className="value">{userData.number || '—'}</span>
                </div>
              </div>
            </div>

            <div className="actions">
              <button className="btn secondary" onClick={handleEditProfile}>
                <i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                Edit Profile
              </button>
              <Link to="/" className="btn ghost">
                <i className="fa-solid fa-shop" aria-hidden="true"></i>
                Continue Shopping
              </Link>
              <Link to="/orders" className="btn secondary">
                <i className="fa-solid fa-box" aria-hidden="true"></i>
                Your Orders
              </Link>
              <button className="btn primary logout-btn" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
                Logout
              </button>
            </div>

            <Link to="/" className="back-home">← Back to Home</Link>
          </div>
        ) : (
          !message && <p className="empty">No profile data available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;