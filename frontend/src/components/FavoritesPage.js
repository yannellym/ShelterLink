import React from 'react';
import '../styles/FavoritesPage.css';
import PetCard from './PetCard';

function FavoritesPage({ favoritePets, removeFromFavorites }) {
  return (
    <div>
      <h2>Favorite Pets</h2>
      <div className="pet-card-container">
        {favoritePets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            // callback function to remove pet from favorites
            removeFromFavorites={removeFromFavorites} // Pass the correct prop name
            isFavorite={true} // Pass isFavorite as true for all pets on FavoritesPage
          />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;