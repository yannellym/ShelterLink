// NearbyPetCard.js
import React from 'react';
import '../styles/NearbyPetCard.css'; 

function NearbyPetCard({ imageSrc, name }) {
  return (
    <div className="pet-card">
      <img src={imageSrc} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default NearbyPetCard;
