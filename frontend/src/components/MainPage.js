import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/MainPage.css';
import PetCard from './PetCard';
import Filter from './Filter';

function MainPage({ favoritePets, addToFavorites, removeFromFavorites }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentPageRef = useRef(1);
  const itemsPerPage = 20;
  const minimumPets = 400;
  const fetchInProgress = useRef(false);
  const [cachedData, setCachedData] = useState([]);
  const totalPages = Math.ceil(minimumPets / itemsPerPage);

  const [selectedFilters, setSelectedFilters] = useState({
    type: 'any',
    breed: 'any',
    age: 'any',
    gender: 'any',
    size: 'any',
    coat: 'any',
  });

  const fetchAllPets = useCallback(() => {
    if (fetchInProgress.current || cachedData.length >= minimumPets) {
      return;
    }

    fetchInProgress.current = true;

    const endpoint = `http://localhost:3002/api/petfinder?page=${currentPageRef.current}&perPage=${itemsPerPage}`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('API Data:', data);

        const updatedResults = [...searchResults, ...(data.animals || [])];

        setLoading(false);

        if (updatedResults.length < minimumPets) {
          currentPageRef.current++;
        }

        setSearchResults(updatedResults);

        // Cache the data
        setCachedData(updatedResults);
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      })
      .finally(() => {
        fetchInProgress.current = false;
      });
  }, [searchResults, cachedData, minimumPets, itemsPerPage]);

  useEffect(() => {
    // Fetch all data on component mount with initial filters
    fetchAllPets();
  }, []); // Empty dependency array for initial fetch

  const applyFilters = (data, filters) => {
    return data.filter((pet) => {
      for (const filterKey in filters) {
        const filterValue = filters[filterKey]?.toLowerCase();
        if (filterValue && filterValue !== 'any') {
          const petValue = pet[filterKey]?.toLowerCase();
          if (petValue !== filterValue) {
            return false;
          }
        }
      }
      return true;
    });
  };

  const handleSearchClick = (filters) => {
    // Apply filters to the cached data
    const filteredResults = applyFilters(cachedData, filters);
    setSearchResults(filteredResults);
  };

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);

    // Apply filters to the cached data
    const filteredResults = applyFilters(cachedData, newFilters);
    setSearchResults(filteredResults);
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

  const handlePageChange = (page) => {
    currentPageRef.current = page;
    setSearchResults([]); // Clear current search results
    fetchAllPets(); // Fetch data for the new page with existing filters
  };

  return (
    <div className="main-page">
      <div className="sidebar">
        <div className="filters">
          {/* Pass the handleSearchClick function to the Filter component */}
          <Filter onSearchClick={handleSearchClick} />
        </div>
      </div>
      <div className="content">
        {/* Render pet cards based on filtered search results */}
        <div className="pet-card-list">{renderPetCards()}</div>
        <div className="pagination-horizontal">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPageRef.current === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
