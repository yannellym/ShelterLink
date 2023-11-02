import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PetCard from '../components/PetCard';
import '../styles/LocationSpecificPets.css';

import usePetfinderAPI from '../hooks/usePetFinderAPI';

function LocationSpecificPets({
  favoritePets,
  addToFavorites,
  removeFromFavorites
}) {
  const location = useLocation();
  const state = location.state;
  const petType = state?.petType || '';
  const searchText = state?.searchText || '';

  // Define the currentPage state at the top level
  const [currentPage, setCurrentPage] = useState(1);
  const [petsToDisplay, setPetsToDisplay] = useState([]); // Add this line
  const [loading, setLoading] = useState(true);
  const [maxPage, setMaxPage] = useState(9);
  const [showOnlyPetsWithImages, setShowOnlyPetsWithImages] = useState(false);

  const dependencies = [petType, currentPage, searchText, showOnlyPetsWithImages]; // Update dependencies

  const { data, loading: apiLoading, error } = usePetfinderAPI(
    `http://localhost:3002/api/petfinder?type=${petType}&location=${searchText}&limit=24&page=${currentPage}`,
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
    if (apiLoading) {
      // Data is still loading
      setLoading(true);
    } else {
      // Data has loaded, update the state
      setLoading(false);
      const filteredPets = showOnlyPetsWithImages
        ? data.animals.filter((pet) => pet.photos.length > 0)
        : data.animals; // Filter only if the checkbox is checked
      setPetsToDisplay(filteredPets || []);
    }
  }, [data, apiLoading, showOnlyPetsWithImages]);

  useEffect(() => {
    updateMaxPage();
  }, [currentPage, maxPage]);

  const renderPageNumbers = () => {
    const totalPageCount = data?.pagination?.total_pages || 1;
    const displayedPages = 9;
    const middlePage = Math.floor(displayedPages / 2);
    let startPage = Math.max(1, currentPage - middlePage);
    let endPage = Math.min(totalPageCount, startPage + displayedPages - 1);

    if (endPage - startPage + 1 < displayedPages) {
      // Adjust the range when there are fewer pages available
      endPage = Math.min(totalPageCount, startPage + displayedPages - 1);
      startPage = Math.max(1, endPage - displayedPages + 1);
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

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

  const handleShowOnlyPetsWithImages = () => {
    setShowOnlyPetsWithImages(!showOnlyPetsWithImages);
  };

  return (
    <div className="location-specific-pets">
      <h2 className="search-results-title">Search Results for:</h2>
      <h3 className="pet-type-title">All {petType}s in the {searchText} area</h3>
      <div className="filter-pets">
        <label>
          <input
            type="checkbox"
            checked={showOnlyPetsWithImages}
            onChange={handleShowOnlyPetsWithImages}
          />
          Show only {petType}s with profile images
        </label>
      </div>
      <div className="pet-card-container">
        {loading ? (
          <p className="loading">Loading...</p>
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
        <div className="page-numbers">
          {renderPageNumbers()}
        </div>
      </div>
    </div>
  );
}

export default LocationSpecificPets;
