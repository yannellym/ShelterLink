import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listUserPetFavorites } from '../graphql/queries';
import '../styles/Profile.css';


/* component that shows the user's information/profile
  parameters: 
  returns: 
*/
const Profile = ({user}) => {
  const [favoritePets, setFavoritePets] = useState([]);

  useEffect(() => {
    const fetchFavoritePets = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listUserPetFavorites));
        const pets = response.data.listUserPetFavorites.items;
    
        setFavoritePets(pets);
      } catch (error) {
        console.error('Error fetching favorite pets:', error);
      }
    };

    if (user) {
      fetchFavoritePets();
    }
  }, [user]);

  return (
    <div className="profile-section">
      <h3 className="profile-title">User Profile</h3>
      <div className="profile-container">
        <img src={user.image} alt="Random Icon" className="avatar" />
        <p className="user-label"><strong>Name:</strong> {user.username}</p>
        <p className="user-label"><strong>Email:</strong> {user.email}</p>
        <p className="user-label"><strong>Number of favorite pets: </strong> {favoritePets.length}</p>
      </div>
    </div>
  );
};

export default Profile;