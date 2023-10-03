import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import PetCard from './PetCard';
import Filter from './Filter';

function MainPage({ favoritePets, addToFavorites, removeFromFavorites }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentPageRef = useState(1);
  const itemsPerPage = 20;
  const minimumPets = 400;
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

  // Function to fetch all pets and store them in memory
  const fetchAllPets = async () => {
    try {
      const endpoint = 'http://localhost:3002/api/petfinder?perPage=400'; // Fetch all pets in a single request
      const response = await fetch(endpoint);
      const data = await response.json();

      console.log('API Response:', data); // Print the API response

      if (data && data.animals) {
        setCachedData(data.animals);
        setSearchResults(data.animals);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPets(); // Fetch all pets when the component mounts
  }, []);

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
  
        // Special handling for the "type" filter to handle both "Cat" and "Dog"
        if (filterKey === 'type') {
          if (filterValue === 'cat' && petValue !== 'cat') {
            matchesAllFilters = false;
            break; // Exit the loop early if there's no match
          }
          if (filterValue === 'dog' && petValue !== 'dog') {
            matchesAllFilters = false;
            break; // Exit the loop early if there's no match
          }
        } else if (filterKey === 'breed') {
          // Handle the "breed" filter
          const primaryBreed = pet.breeds?.primary?.toLowerCase();
          if (primaryBreed !== filterValue) {
            matchesAllFilters = false;
            break; // Exit the loop early if there's no match
          }
        } else {
          // For other filters, compare values directly
          if (petValue !== filterValue) {
            matchesAllFilters = false;
            break; // Exit the loop early if there's no match
          }
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
