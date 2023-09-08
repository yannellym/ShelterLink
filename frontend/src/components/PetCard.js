import React, { useState } from 'react';
import '../styles/PetCard.css';

const PetCard = ({ pet, addToFavorites, removeFromFavorites, isFavorite }) => {
  // Replace the local state with the 'isFavorite' prop
  const [favorited, setFavorited] = useState(isFavorite);

  const handleToggleFavorite = () => {
    // Toggle the 'isFavorite' state and call the appropriate function
    setFavorited(!favorited);
    if (favorited) {
      removeFromFavorites(pet.id);
    } else {
      addToFavorites(pet);
    }
  };

  // Check if the 'pet.photos' array is not empty
  if (!pet.photos || pet.photos.length === 0) {
    return null; // Skip rendering this card if no photos are available
  }
  // Check if the 'pet.description' array is not empty
  if (!pet.description || pet.description.length === 0) {
    return null; // Skip rendering this card if no photos are available
  }

  // Truncate the description to one line with "..." at the end
  const truncatedDescription =
    pet.description && pet.description.length > 100 ? `${pet.description.substring(0, 100)}...` : pet.description;


  return (
    <div className="pet-card">
      <img src={pet.photos[0]?.medium} alt={pet.name} className="pet-card-image" />
      <h3>
        {pet.name} |{' '}
        <span role="img" aria-label="Location">
          📍 {pet.contact.address.city}, {pet.contact.address.state}
        </span>
      </h3>
      <div className="pet-card-info">
        <div>
          <p>
            {pet.age} | {pet.gender} | {pet.size} | {pet.breeds.primary}
          </p>
        </div>
      </div>
      <p className="pet-card-description">{truncatedDescription}</p>
      <div className="pet-card-footer">
        <button className="more-info-button">More Info</button>
        <button
          className={`favorite-heart-${favorited ? 'favorited' : 'unfavorited'}`}
          onClick={handleToggleFavorite}
          tabIndex="0"
        >
          &#10084;
        </button>
      </div>
    </div>
  );
};

export default PetCard;
