import React, { useState, useEffect } from 'react';
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
  const { total_pages } = data.pagination;

  const itemsPerPage = 20;

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

  // Function to handle clicking on a specific page number
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= total_pages) {
      setCurrentPage(pageNumber);
    }
  };

  // Create an array of page numbers (1-9)
  const pageNumbers = Array.from({ length: 9 }, (_, i) => i + 1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const petsToDisplay = data.animals.slice(startIndex, endIndex);

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
        <div className="page-numbers">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button onClick={handleNextPage} disabled={currentPage === total_pages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default LocationSpecificPets;
