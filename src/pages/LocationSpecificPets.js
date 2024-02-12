import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PetCard from '../components/PetCard';
import '../styles/LocationSpecificPets.css';
import usePetfinderAPI from '../hooks/usePetFinderAPI';

/* component that shows nearby pets based on user;s location
  parameters: favoritePets: array, addToFavorites: array, removeFromFavorites:array, isAuthenticated: string
  returns: 
*/
function LocationSpecificPets({ favoritePets, isAuthenticated }) {
  const location = useLocation();
  const state = location.state;
  const petType = state?.petType || '';
  const searchText = state?.searchText || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [petsToDisplay, setPetsToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPage, setMaxPage] = useState(1);
  const dependencies = [petType, searchText, currentPage];

  const { data, loading: apiLoading } = usePetfinderAPI(
    `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/pet_zip_search?type=${petType}&location=${searchText}&page=${currentPage}`,
    dependencies
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
    }
    // Scroll to the top of the page when a new page is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (apiLoading) {
      setLoading(true);
    } else {
      setLoading(false);
      const parsedData = JSON.parse(data.body);
      const filteredPets = parsedData.animals;
      setPetsToDisplay(filteredPets || []);
      setMaxPage(parsedData.pagination?.total_pages || 1);
    }
  }, [data, apiLoading, ]);

  const renderPageNumbers = () => {
    const displayedPages = 9;
    const middlePage = Math.floor(displayedPages / 2);
    let startPage = Math.max(1, currentPage - middlePage);
    let endPage = Math.min(maxPage, startPage + displayedPages - 1);

    if (endPage - startPage + 1 < displayedPages) {
      endPage = Math.min(maxPage, startPage + displayedPages - 1);
      startPage = Math.max(1, endPage - displayedPages + 1);
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
      >
        {pageNumber}
      </button>
    ));
  };


  return (
    <div className="location-specific-pets">
      <h2 className="search-results-title">Search Results for:</h2>
      <h3 className="pet-type-title">All {petType}s in the {searchText} area</h3>
      <div className="pet-card-container-location-pets">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          petsToDisplay.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              isFavorite={favoritePets.some((favoritePet) => favoritePet.id === pet.id)}
              isAuthenticated={isAuthenticated}
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