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
  const totalPages = Math.ceil(cachedData.length / itemsPerPage);

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

        const updatedResults = [...cachedData, ...(data.animals || [])];

        setLoading(false);

        if (updatedResults.length < minimumPets) {
          currentPageRef.current++;
        }

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
  }, [cachedData, minimumPets, itemsPerPage]);

  useEffect(() => {
    if (cachedData.length === 0) {
      // Only fetch from API if the cache is empty
      fetchAllPets();
    } else {
      // If cached data is available, set loading to false
      setLoading(false);
    }
  }, [cachedData, fetchAllPets]);

  const handlePageChange = (page) => {
    currentPageRef.current = page;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setSearchResults(cachedData.slice(startIndex, endIndex));
  };

  // Function to handle filter changes
  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);

    // Apply filters to the cached data and update search results
    const filteredResults = applyFilters(cachedData, newFilters);
    setSearchResults(filteredResults);
  };

  // Function to apply filters to the data
  const applyFilters = (data, filters) => {
    return data.filter((pet) => {
      // Flag to check if the pet matches all filters
      let matchesAllFilters = true;
  
      for (const filterKey in filters) {
        const filterValue = filters[filterKey]?.toLowerCase();
        const petValue = pet[filterKey]?.toLowerCase();
  
        // If the filter value is "any," skip this filter
        if (filterValue === 'any') {
          continue;
        }
  
        // If the pet data doesn't match the filter value, set the flag to false
        if (petValue !== filterValue) {
          matchesAllFilters = false;
          break; // Exit the loop early if there's no match
        }
      }
  
      // If the pet matches all filters, include it in the results
      return matchesAllFilters;
    });
  };
  const renderPetCards = () => {
    if (!loading) {
      // Apply filters to the cached data
      const filteredResults = applyFilters(cachedData, selectedFilters);

      if (filteredResults.length > 0) {
        return filteredResults.map((pet) => (
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

  return (
    <div className="main-page">
      <div className="sidebar">
        <div className="filters">
          {/* Pass the handleFilterChange function to the Filter component */}
          <Filter onFilterChange={handleFilterChange} />
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
