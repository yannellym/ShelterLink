import React from 'react';
import { Auth } from 'aws-amplify';
import '../styles/Profile.css';
import userAvatar from '../images/user_icon.png'


const Profile = () => {
  const user = Auth.user;

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-info">
        <img
          src={userAvatar}
          alt="User Avatar"
          className="avatar"
        />
        <p><strong>Email:</strong> {user.attributes.email}</p>
        {/* You can add more user information here if needed */}
      </div>
    </div>
  );
};

export default Profile;