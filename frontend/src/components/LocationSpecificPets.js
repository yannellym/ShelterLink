import React from 'react';
import { useLocation } from 'react-router-dom';
import PetCard from './PetCard'; // Import the PetCard component

const LocationSpecificPets = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get('searchText');
  const petType = searchParams.get('petType');


  return (
    <div>
      <h2>Search Results for: {searchText}</h2>
      <h3>Pet Type: {petType}</h3>
      <div className="pet-card-container">
        "back"
      </div>
    </div>
  );
};

export default LocationSpecificPets;
