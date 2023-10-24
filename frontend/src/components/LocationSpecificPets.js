import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PetCard from './PetCard';
import '../styles/LocationSpecificPets.css';

const LocationSpecificPets = ({
  favoritePets,
  addToFavorites,
  removeFromFavorites
}) => {
  const location = useLocation();
  const state = location.state;

  // Define the currentPage state at the top level
  const [currentPage, setCurrentPage] = useState(1);

  if (!state || !state.data) {
    return <div className="loading">Loading...</div>;
  }

  // unpack the values received from the state
  const { data, petType, searchText } = state;
  const { total_pages } = data.pagination; // Extract the total pages

  const itemsPerPage = 20; 

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const petsToDisplay = data.animals.slice(startIndex, endIndex);

  // Function to handle moving to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle moving to the next page
  const handleNextPage = () => {
    if (currentPage < total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="location-specific-pets">
      <h2 className="search-results-title">Search Results for:</h2>
      <h3 className="pet-type-title">All {petType}s in the {searchText} area</h3>
      <div className="pet-card-container">
        {petsToDisplay.length === 0 ? (
          <p className="no-animals-message">No animals found.</p>
        ) : (
          petsToDisplay.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isFavorite={favoritePets.some((favoritePet) => favoritePet.id === pet.id)}
            />
          ))
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>Page {currentPage} of {total_pages}</span>
        <button onClick={handleNextPage} disabled={currentPage === total_pages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default LocationSpecificPets;
