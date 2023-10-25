
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PetCard from './PetCard';
import '../styles/LocationSpecificPets.css';

import usePetfinderAPI from '../hooks/usePetFinderAPI';

function LocationSpecificPets({
  favoritePets,
  addToFavorites,
  removeFromFavorites
}) {
  const location = useLocation();
  const state = location.state;

  // Define the currentPage state at the top level
  const [currentPage, setCurrentPage] = useState(1);
  const [petsToDisplay, setPetsToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPage, setMaxPage] = useState(9);

  const dependencies = [state.petType, currentPage];

  const { data, loading: apiLoading, error } = usePetfinderAPI(
    `http://localhost:3002/api/petfinder?type=${state.petType}&location=${state.searchText}&limit=20&page=${currentPage}`,
    dependencies
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateMaxPage = () => {
    if (currentPage === maxPage) {
      setMaxPage(maxPage + 10);
    }
  };

  useEffect(() => {
    setPetsToDisplay(data.animals || []);
    setLoading(apiLoading);
  }, [data, apiLoading]);

  useEffect(() => {
    updateMaxPage();
  }, [currentPage, maxPage]);

  const renderPageNumbers = () => {
    const pageNumbers = Array.from(
      { length: maxPage },
      (_, i) => i + 1
    ).filter((pageNumber) => pageNumber <= maxPage);
    
    return pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={currentPage === pageNumber ? 'active' : ''}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div className="location-specific-pets">
      <h2 className="search-results-title">Search Results for:</h2>
      <h3 className="pet-type-title">All {state.petType}s in the {state.searchText} area</h3>
      <div className="pet-card-container">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : petsToDisplay.length === 0 ? (
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
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <div className="page-numbers">
          {renderPageNumbers()}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={petsToDisplay.length < 20}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default LocationSpecificPets;
