import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import PetCard from './PetCard';
import Filter from './Filter';

function MainPage({ favoritePets, addToFavorites, removeFromFavorites }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When the component mounts, fetch all animals
    fetchAllPets();
  }, []);

  const fetchAllPets = () => {
    const endpoint = 'http://localhost:3002/api/petfinder';

    fetch(endpoint)
    .then((response) => {
      console.log('API Response:', response);
      return response.json();
    })
    .then((data) => {
      console.log('API Data:', data);
      setSearchResults(data.animals || []);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    });
  };

  const handleFilterChange = (filters) => {
    // Apply client-side filtering based on filters
    let filteredData = [...searchResults];

    // Filter by pet type
    if (filters.type !== 'any') {
      filteredData = filteredData.filter((pet) => pet.type.toLowerCase() === filters.type.toLowerCase());
    }
    // Filter by breed
    if (filters.breed !== 'any') {
      filteredData = filteredData.filter((pet) => pet.breed.toLowerCase() === filters.breed.toLowerCase());
    }
    // Filter by age
    if (filters.age !== 'any') {
      filteredData = filteredData.filter((pet) => pet.age.toLowerCase() === filters.age);
    }
    // Filter by gender
    if (filters.gender !== 'any') {
      filteredData = filteredData.filter((pet) => pet.gender.toLowerCase() === filters.gender);
    }
    // Filter by size
    if (filters.size !== 'any') {
      filteredData = filteredData.filter((pet) => pet.size.toLowerCase() === filters.size);
    }
    // Filter by coat
    if (filters.coat !== 'any') {
      filteredData = filteredData.filter((pet) => pet.coat.toLowerCase() === filters.coat);
    }

    setSearchResults(filteredData);
  };

  return (
    <div className="main-page">
      <div className="sidebar">
        <div className="filters">
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="pet-card-list">
            {searchResults.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                isFavorite={favoritePets.some((favoritePet) => favoritePet.id === pet.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;