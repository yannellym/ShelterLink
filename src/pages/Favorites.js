import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FavoritesPage.css';
import PetCard from '../components/PetCard';
import SadLab from '../images/sadlab.jpg';
import { API, graphqlOperation } from 'aws-amplify';
import { listUserPetFavorites, getPet } from '../graphql/queries';
import { onCreateUserPetFavorite, onDeleteUserPetFavorite } from '../graphql/subscriptions';

function Favorites({ user, handleToggleFavorite }) {
  const [favoritePets, setFavoritePets] = useState([]);

  useEffect(() => {
    const fetchFavoritePets = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listUserPetFavorites));
        const pets = response.data.listUserPetFavorites.items;

        const petsWithDetails = await Promise.all(
          pets.map(async (pet) => {
            const petDetails = await API.graphql(graphqlOperation(getPet, { id: pet.petId }));
            return petDetails.data.getPet;
          })
        );

        setFavoritePets(petsWithDetails);
      } catch (error) {
        console.error('Error fetching favorite pets:', error);
      }
    };

    // Fetch favorite pets when the component mounts
    fetchFavoritePets();

    // Subscribe to new favorites and deletions
    const createSubscription = API.graphql(graphqlOperation(onCreateUserPetFavorite)).subscribe({
      next: () => fetchFavoritePets(),
    });

    const deleteSubscription = API.graphql(graphqlOperation(onDeleteUserPetFavorite)).subscribe({
      next: () => fetchFavoritePets(),
    });

    // Clean up subscriptions when the component unmounts
    return () => {
      createSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="pet-card-container">
      <div className="title-container">
        <h1>Favorite Pets 🐾 </h1>
      </div>
      {favoritePets.length === 0 ? (
        <div className="message-container">
          <img src={SadLab} alt="Sad Lab" className="sad-lab-image" />
          <div className="message">
            <h2>Uh oh, no pets have been favorited yet.</h2>
            <p>
              Click <Link to="/find-a-pet" className="link">HERE</Link> to find your next companion 🦴🧶.
            </p>
          </div>
        </div>
      ) : (
        <div className="pet-card-list">
          {favoritePets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              user={user}
              favorited={true}
              handleToggleFavorite={() => handleToggleFavorite(pet)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;