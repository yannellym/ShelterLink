import React from 'react';
import '../styles/NearbyPetCard.css'; 

function NearbyPetCard({ imageSrc, name }) {
  // If the imageSrc is null, use a default Google image link
  const fallbackImage = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png';

  return (
    <div className="pet-card">
      {/* Use the imageSrc if it's available, otherwise use the fallback image */}
      <img src={imageSrc || fallbackImage} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default NearbyPetCard;
