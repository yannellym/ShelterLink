import React, { useState } from 'react';
import '../styles/PetCard.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PetCard = ({ pet, addToFavorites, removeFromFavorites, isFavorite }) => {
  const [favorited, setFavorited] = useState(isFavorite);
  const navigate = useNavigate(); // Get the navigate function

  const handleToggleFavorite = () => {
    setFavorited(!favorited);
    if (favorited) {
      removeFromFavorites(pet.id);
    } else {
      addToFavorites(pet);
    }
  };

  const handleMoreInfoClick = () => {
    // Use navigate to go to the PetDetails component and send the pet data as state
    navigate(`/pet-details/${pet.id}`, { state: { petData: pet } });
  };

  if (!pet.photos || pet.photos.length === 0) {
    return null;
  }

  if (!pet.description || pet.description.length === 0) {
    return null;
  }

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
        <button className="more-info-button" onClick={handleMoreInfoClick}>
          More Info
        </button>
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
