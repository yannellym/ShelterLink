import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import PetCard from './PetCard';
import Filter from './Filter';

function MainPage({ favoritePets, addToFavorites, removeFromFavorites }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    type: 'dog',
    breed: 'any',
    age: 'any',
    gender: 'any',
    size: 'any',
    coat: 'any',
  });

  useEffect(() => {
    // When the component mounts, fetch all animals
    fetchAllPets();
  }, []);

  const fetchAllPets = () => {
    const endpoint = 'http://localhost:3002/api/petfinder';

    fetch(endpoint)
      .then((response) => response.json())
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

  const applyFilters = (data) => {

    // Filter by type
    return data.filter((pet) => {
      console.log( filters.type)
    });
  };

  const handleFilterChange = (selectedFilters) => {
    // Update the filters state with the selected filter values
    setFilters(selectedFilters);
    console.log('Selected Type Filter:', selectedFilters);
  };

  const filteredResults = applyFilters(searchResults);

  return (
    <div className="main-page">
      <div className="sidebar">
        <div className="filters">
          <Filter filters={filters} onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="pet-card-list">
            {filteredResults.map((pet) => (
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
