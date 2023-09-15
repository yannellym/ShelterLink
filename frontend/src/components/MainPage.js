import React, { useState, useCallback, useRef, useEffect } from 'react';
import '../styles/MainPage.css';
import PetCard from './PetCard';
import Filter from './Filter';

function MainPage({ favoritePets, addToFavorites, removeFromFavorites }) {
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const currentPageRef = useRef(1); // Use a ref to track the current page
  const itemsPerPage = 10; // Number of dogs to display per page
  const minimumPets = 100; // Minimum number of pets to query
  const fetchInProgress = useRef(false); // To prevent concurrent fetch requests
  const filterTimeout = useRef(null); // To debounce filter function

  const [selectedFilters, setSelectedFilters] = useState({
    type: 'any',
    breed: 'any',
    age: 'any',
    gender: 'any',
    size: 'any',
    coat: 'any',
  });

  const fetchAllPets = useCallback(() => {
    if (fetchInProgress.current || searchResults.length >= minimumPets) {
      return;
    }

    fetchInProgress.current = true;

    const endpoint = `http://localhost:3002/api/petfinder?page=${currentPageRef.current}&perPage=${itemsPerPage}`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('API Data:', data);

        // Combine new results with existing results
        const updatedResults = [...searchResults, ...(data.animals || [])];

        // Set loading to false when fetching is complete
        setLoading(false);

        // If we haven't reached the minimumPets, increment the current page
        if (updatedResults.length < minimumPets) {
          currentPageRef.current++;
        }

        setSearchResults(updatedResults);
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);

        // Set loading to false on error
        setLoading(false);
      })
      .finally(() => {
        fetchInProgress.current = false;
      });
  }, [searchResults, minimumPets, itemsPerPage]);

  useEffect(() => {
    // Fetch all data on component mount
    fetchAllPets();
  }, []); // Fetch only on mount

  const applyFilters = (data, selectedFilters) => {
    // Apply filters for all filter categories
    for (const filterKey in selectedFilters) {
      const filterValue = selectedFilters[filterKey]?.toLowerCase();
      if (filterValue && filterValue !== 'any') {
        data = data.filter((pet) => {
          // Filter logic for the given category
          const petValue = pet[filterKey]?.toLowerCase();
          return petValue && petValue === filterValue;
        });
      }
    }

    return data;
  };

  const handleSearchClick = () => {
    if (filterTimeout.current) {
      clearTimeout(filterTimeout.current);
    }

    filterTimeout.current = setTimeout(() => {
      // Apply filters based on the selected filters
      const filteredResults = applyFilters(searchResults, selectedFilters);
      setFilteredResults(filteredResults);
    }, 300); // Debounce for 300 milliseconds
  };

  return (
    <div className="main-page">
      <div className="sidebar">
        <div className="filters">
          {/* Pass setSelectedFilters and onSearchClick to the Filter component */}
          <Filter
            selectedFilters={selectedFilters}
            onFilterChange={(newFilters) => setSelectedFilters(newFilters)}
            onSearchClick={handleSearchClick}
          />
        </div>
      </div>
      <div className="content">
        {!loading ? (
          <div className="pet-card-list">
            {filteredResults.length > 0
              ? filteredResults.map((pet) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}
                    isFavorite={favoritePets.some((favoritePet) => favoritePet.id === pet.id)}
                  />
                ))
              : searchResults.map((pet) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}
                    isFavorite={favoritePets.some((favoritePet) => favoritePet.id === pet.id)}
                  />
                ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default MainPage;
