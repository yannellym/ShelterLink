import React from 'react';
import '../styles/NearbyPetCard.css'; 

// card to display pets nearby the user
function NearbyPetCard({ imageSrc, name }) {
  // If the imageSrc is null, use a default Google image link
  const fallbackImage = './images/dog2.jpg';

  return (
    <div className="pet-card">
      {/* Use the imageSrc if it's available, otherwise use the fallback image */}
      <img src={imageSrc || fallbackImage} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default NearbyPetCard;
