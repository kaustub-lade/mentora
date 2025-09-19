// src/pages/Profile.jsx
import React from 'react';
import './Profile.css';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-left">
          <img
            src={
      currentUser?.image_url
      ? `http://localhost:5000${currentUser.image_url}`
      : 'https://via.placeholder.com/150'
      }
      alt="User"
            className="profile-image"
          />
        </div>
        <div className="profile-right">
          <h2>{currentUser?.name}</h2>
          <p><strong>Username:</strong> {currentUser?.username}</p>
          <p><strong>Email:</strong> {currentUser?.email}</p>
          <p><strong>Mobile:</strong> {currentUser?.mobile}</p>
          <p><strong>Gender:</strong> {currentUser?.gender}</p>
          <p><strong>Address:</strong> {currentUser?.address}</p>
          <p><strong>Qualification:</strong> {currentUser?.qualification}</p>
          <p><strong>Subjects:</strong> {currentUser?.subjects}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
