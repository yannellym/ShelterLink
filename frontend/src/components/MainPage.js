import React, { useState } from 'react';
import SearchBar from './SearchBar';
import PetCard from './PetCard';
import Filter from './Filter';

function MainPage() {
  const [searchResults, setSearchResults] = useState([]); // Store the fetched pet data
  const [filters, setFilters] = useState({
    size: 'medium', // Default filter values
    // Add more filter options here
  });

  const handleSearch = (searchText) => {
    // Fetch pet data based on the search text
    // Update the searchResults state with fetched data
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  return (
    <div className="main-page">
      <SearchBar onSearch={handleSearch} />
      <div className="content">
        <Filter filters={filters} onFilterChange={handleFilterChange} />
        <div className="pet-card-list">
          {searchResults.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
