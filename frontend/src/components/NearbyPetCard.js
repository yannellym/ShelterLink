import React from 'react';
import '../styles/NearbyPetCard.css';

function NearbyPetCard({ imageSrc, name, age, location }) {
  // If the imageSrc is null, use a default Google image link
  const fallbackImage = '../images/dog.jpg';

  return (
    <div className="pet-card">
      {/* Use the imageSrc if it's available, otherwise use the fallback image */}
      <img src={imageSrc || fallbackImage} alt={name} />
      <div className="pet-info">
        <h3>{name}</h3>
        <p>{`Age: ${age || 'Unknown'}`}</p>
        <p>{`Location: ${location || 'Unknown'}`}</p>
      </div>
    </div>
  );
}

export default NearbyPetCard;
