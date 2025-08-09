import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');
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
      }
    };

    if (userEmail) {
      fetchUserData();
    } else {
      setMessage('No user is logged in.');
    }
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem('mail');
    alert('You have been logged out.');
    navigate('/');
  };

  return (
    <div className="Profile">
      <div className="profile-container">
        <h2>User Profile</h2>
        {message && <p className="error">{message}</p>}
        {userData ? (
          <div className="profile-details">
              <Link to="/" className="back-home">← Back to Home</Link>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.mail}</p>
            <p><strong>Number:</strong> {userData.number}</p>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        
          </div>
        ) : (
          !message && <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
