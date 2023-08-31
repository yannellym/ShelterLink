import React, { useState } from 'react';
import '../styles/Favorites.css';

const Favorites = () => {
  // Placeholder data for favorited pets
  const favoritedPetsData = [
    {
      id: 1,
      name: 'Buddy',
      photo: '/images/dog.jpg',
      shelter: 'Happy Paws Shelter',
      favorited: true, // Initially favorited
    },
    {
      id: 2,
      name: 'Daisy',
      photo: '/images/dog2.jpg',
      shelter: 'Loving Hearts Rescue',
      favorited: false,
    },
    {
      id: 2,
      name: 'Daisy',
      photo: '/images/kitten1.jpg',
      shelter: 'Loving Hearts Rescue',
      favorited: false,
    },
  ];

  const [favoritedPets, setFavoritedPets] = useState(favoritedPetsData);

  const handleToggleFavorite = (id) => {
    setFavoritedPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === id ? { ...pet, favorited: !pet.favorited } : pet
      )
    );
  };

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <div className="favorite-cards">
        {favoritedPets.map((pet) => (
          <div className="favorite-card" key={pet.id}>
            <img src={pet.photo} alt={pet.name} />
            <h3>{pet.name}</h3>
            <p>{pet.shelter}</p>
            <button
              className={`favorite-heart ${pet.favorited ? 'favorited' : ''}`}
              onClick={() => handleToggleFavorite(pet.id)}
            >
              &#10084;
            </button>
            <button className="more-info-button">More Info</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;