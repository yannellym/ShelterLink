import React, { useState } from 'react';

const PetCard = ({ pet }) => {
  const [favorited, setFavorited] = useState(pet.favorited);

  const handleToggleFavorite = () => {
    setFavorited(!favorited);
  };

  return (
    <div className="favorite-card">
      <img src={pet.photo} alt={pet.name} />
      <h3>{pet.name}</h3>
      <p>{pet.breed}</p>
      <p>Age: {pet.age}</p>
      <p>{pet.distance} away</p>
      <button
        className={`favorite-heart ${favorited ? 'favorited' : ''}`}
        onClick={handleToggleFavorite}
      >
        &#10084;
      </button>
      <button className="more-info-button">More Info</button>
    </div>
  );
};

export default PetCard;
