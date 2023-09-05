import React, { useState } from 'react';
import '../styles/PetCard.css';

const PetCard = ({ pet }) => {
  const [favorited, setFavorited] = useState(false);

  const handleToggleFavorite = () => {
    setFavorited(!favorited);
  };

  // Truncate the description to one line with "..." at the end
  const truncatedDescription =
    pet.description.length > 100 ? `${pet.description.substring(0, 100)}...` : pet.description;

  return (
    <div className="pet-card">
      <img src={pet.photos[0]} alt={pet.name} className="pet-card-image" />
      <h3>
        {pet.name} |{' '}
        <span role="img" aria-label="Location">
          📍 {pet.contact.address.city}, {pet.contact.address.state}
        </span>
      </h3>
      <div className="pet-card-info">
        <div>
          <p>
            {pet.age} | {pet.gender} | {pet.size} | {pet.breed}
          </p>
        </div>
      </div>
      <p className="pet-card-description">{truncatedDescription}</p>
      <div className="pet-card-footer">
        <button
          className={`favorite-heart ${favorited ? 'favorited' : ''}`}
          onClick={handleToggleFavorite}
          tabIndex="0"
        >
          &#10084;
        </button>
        <button className="more-info-button">More Info</button>
      </div>
    </div>
  );
};

export default PetCard;