import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import '../styles/Profile.css';
import userAvatar from '../images/user_icon.png';

const Profile = () => {
  const [randomPhoto, setRandomPhoto] = useState(null);
  const user = Auth.user;

  useEffect(() => {
    // Fetch a random photo from Unsplash API
    const fetchRandomPhoto = async () => {
      try {
        const response = await axios.get('https://source.unsplash.com/random');
        setRandomPhoto(response.request.responseURL);
      } catch (error) {
        console.error('Error fetching random photo:', error);
      }
    };

    fetchRandomPhoto();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-info">
        {randomPhoto ? (
          <img src={randomPhoto} alt="Random Photo" className="avatar" />
        ) : (
          <img src={userAvatar} alt="User Avatar" className="avatar" />
        )}
        <p><strong>Name:</strong> {user.attributes.name}</p>
        <p><strong>Email:</strong> {user.attributes.email}</p>
      </div>
    </div>
  );
};

export default Profile;
