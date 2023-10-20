import React from 'react';
import { useLocation } from 'react-router-dom';
import PetCard from './PetCard';
import '../styles/LocationSpecificPets.css';

const LocationSpecificPets = () => {
  const location = useLocation();
  const state = location.state;

  if (!state || !state.data) {
    return <div className="loading">Loading...</div>;
  }

  // unpack the values received from the state
  const { data, petType, searchText } = state;

  return (
    <div className="location-specific-pets">
      <h2 className="search-results-title">
        Search Results for:
      </h2>
      <h3 className="pet-type-title">All {petType}s in the {searchText} area</h3>
      <div className="pet-card-container">
        {data.animals.length === 0 ? (
          <p className="no-animals-message">No animals found.</p>
        ) : (
          data.animals.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))
        )}
      </div>
    </div>
  );
};

export default LocationSpecificPets;
