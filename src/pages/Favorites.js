import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FavoritesPage.css';
import PetCard from '../components/PetCard';
import SadLab from '../images/sadlab.jpg';
import { API, graphqlOperation } from 'aws-amplify';
import { listUserPetFavorites, getPet } from '../graphql/queries';

// component to show pets that were favorited by the user
function Favorites({ removeFromFavorites }) {
  const [favoritePets, setFavoritePets] = useState([]);

  useEffect(() => {
    const fetchFavoritePets = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listUserPetFavorites));
        const pets = response.data.listUserPetFavorites.items;
        console.log(pets, "pets from the user's favs")
  
        // Fetch details for each favorite pet
        const petsWithDetails = await Promise.all(
          pets.map(async (pet) => {
            const petDetails = await API.graphql(graphqlOperation(getPet, { id: pet.petId }));
            console.log(petDetails, "pet detials from pet table")
            return petDetails.data.getPet;
          })
        );
  
        setFavoritePets(petsWithDetails);
      } catch (error) {
        console.error('Error fetching favorite pets:', error);
      }
    };
  
    fetchFavoritePets();
  }, []);
  
  useEffect(() => {
  }, [favoritePets]); // Log changes to favoritePets
  
  console.log("favorite pets before render", favoritePets)
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
              // removeFromFavorites={removeFromFavorites}
              // isFavorite={favoritePets.some((favoritePet) => favoritePet.id === pet.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
