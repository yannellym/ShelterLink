import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FavoritesPage.css';
import PetCard from '../components/PetCard';
import SadLab from '../images/sadlab.jpg';
import { API, graphqlOperation } from 'aws-amplify';
import { listUserPetFavorites } from '../graphql/queries';

// component to show pets that were favorited by the user
function Favorites({ removeFromFavorites }) {
  const [favoritePets, setFavoritePets] = useState([]);

  useEffect(() => {
    const fetchFavoritePets = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listUserPetFavorites ));
        const pets = response.data.listUserPetFavorites.items;
        console.log(pets, "users fav pets")
        setFavoritePets(pets);
      } catch (error) {
        console.error('Error fetching favorite pets:', error);
      }
    };

    fetchFavoritePets();
  }, []);

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
            <p>{pet.petId}</p>
            // <PetCard
            //   key={pet.petId}
            //   pet={pet.pet} // Assuming that the favorite pet has a "pet" field
            //   removeFromFavorites={removeFromFavorites}
            //   isFavorite={favoritePets.some((favoritePet) => favoritePet.id === pet.id)}
            // />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
