import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import '../styles/Profile.css';
import userAvatar from '../images/user_icon.png';

/* component that shows the user's information/profile
  parameters: 
  returns: 
*/
//TODO: set userAvatar as photo in case the response fails
const Profile = () => {
  const [randomPhoto, setRandomPhoto] = useState(null);
  const user = Auth.user;
  console.log(user)
  useEffect(() => {
    const fetchRandomPhoto = async () => {
      try {
        const response = await axios.get('');
        setRandomPhoto(response.request.responseURL);
      } catch (error) {
        setRandomPhoto(userAvatar)
      }
    };
    // Fetch a random photo from Unsplash API
    fetchRandomPhoto();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div className="profile-section">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-container">
        <img src={randomPhoto} alt="Random Icon" className="avatar" />
        <p><strong>Name:</strong> {user.attributes.name}</p>
        <p><strong>Email:</strong> {user.attributes.email}</p>
      </div>
    </div>
  );
};

export default Profile;