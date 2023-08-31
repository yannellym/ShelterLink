import React, { useState } from 'react';
import '../styles/MainPage.css';
import SearchBar from './SearchBar';
import PetCard from './PetCard';
import Filter from './Filter';

function MainPage() {
  const [searchResults, setSearchResults] = useState([
    // Sample pet data
    {
      id: 1,
      name: 'Buddy',
      breed: 'Golden Retriever',
      age: 'Puppy',
      size: 'Medium',
      gender: 'Male',
      shelter: 'Happy Paws Shelter',
      photo: '/images/dog2.jpg', // Sample photo path
      distance: '2 miles', // Sample distance from user
    },
    {
      id: 2,
      name: 'Daisy',
      breed: 'Labrador',
      age: 'Adult',
      size: 'Large',
      gender: 'Female',
      shelter: 'Loving Hearts Rescue',
      photo: '/images/dog.jpg', // Sample photo path
      distance: '5 miles', // Sample distance from user
    },
    // Add more sample pet data as needed
  ]);
  const [filters, setFilters] = useState({
    size: 'medium', // Default filter values
    breed: 'breed1', // Default breed filter
    age: 'puppy',   // Default age filter
    gender: 'male', // Default gender filter
    shelter: 'shelter1', // Default shelter filter
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
}

export default MainPage;
