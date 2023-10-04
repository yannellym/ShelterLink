import React, { useState, useEffect, useRef } from 'react';
import '../styles/MainPage.css';
import PetCard from './PetCard';
import Filter from './Filter';

function MainPage({ favoritePets, addToFavorites, removeFromFavorites }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentPageRef = useRef(1);
  const itemsPerPage = 20;
  const minimumPets = 400;
  const [cachedData, setCachedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedFilters, setSelectedFilters] = useState({
    type: 'any',
    breed: 'any',
    age: 'any',
    gender: 'any',
    size: 'any',
    coat: 'any',
  });

  // Function to fetch pets based on filters and pagination
  const fetchPets = async () => {
    try {
      const filters = Object.keys(selectedFilters)
        .filter((key) => selectedFilters[key] !== 'any')
        .map((key) => `${key}=${selectedFilters[key]}`)
        .join('&');

      const endpoint = `http://localhost:3002/api/petfinder?perPage=${itemsPerPage}&page=${currentPageRef.current}&${filters}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      console.log('API Response:', data);

      if (data && data.animals) {
        setCachedData(data.animals);
        setSearchResults(data.animals);
        setTotalPages(Math.ceil(data.pagination.total_count / itemsPerPage));
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [currentPageRef, selectedFilters]);

  const handlePageChange = (page) => {
    currentPageRef.current = page;
  };

  // Function to handle filter changes
  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
    currentPageRef.current = 1;
  };

  const renderPetCards = () => {
    if (!loading) {
      if (searchResults.length > 0) {
        return searchResults.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isFavorite={favoritePets.some((favoritePet) => favoritePet.id === pet.id)}
          />
        ));
      } else {
        return <p>No pets match your criteria.</p>;
      }
    } else {
      return <p>Loading...</p>;
    }
  };

  const renderPaginationButtons = () => {
    const visiblePageCount = 9; // Number of visible page buttons
    const totalPagesToDisplay = Math.min(totalPages, visiblePageCount);
    const firstPage = Math.max(currentPageRef.current - Math.floor(visiblePageCount / 2), 1);
    const lastPage = firstPage + totalPagesToDisplay - 1;

    return (
      <div className="pagination-horizontal">
        {Array.from({ length: totalPagesToDisplay }, (_, index) => {
          const page = firstPage + index;
          return (
            <button
              key={index}
              onClick={() => {
                handlePageChange(page);
                fetchPets();
              }}
              className={currentPageRef.current === page ? 'active' : ''}
            >
              {page}
            </button>
          );
        })}
        {lastPage < totalPages && (
          <button
            onClick={() => {
              handlePageChange(lastPage + 1);
              fetchPets();
            }}
          >
            ...
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="main-page">
      <div className="sidebar">
        <div className="filters">
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="content">
        <div className="pet-card-list">{renderPetCards()}</div>
        {totalPages > 1 && renderPaginationButtons()}
      </div>
    </div>
  );
}

export default MainPage;

