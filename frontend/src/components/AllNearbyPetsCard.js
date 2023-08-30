// AllNearbyPetsCard.js
import React from 'react';
import '../styles/AllNearbyPetsCard.css';

function AllNearbyPetsCard({ imageSrc, name }) {
  return (
    <div className="all-pets-card">
      <img src={imageSrc} alt={name} />
      <h3>All Nearby Pets</h3>
      <p>View all available pets near you.</p>
    </div>
  );
}

export default AllNearbyPetsCard;
