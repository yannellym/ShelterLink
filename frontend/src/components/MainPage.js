import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import SearchBar from './SearchBar';
import PetCard from './PetCard';
import Filter from './Filter';
import SampleData from './SampleData';

function MainPage({ onFilterChange }) {
  const [filters, setFilters] = useState({
    type: 'any',
    breed: 'any',
    age: 'any',
    gender: 'any',
    size: 'any',
    coat: 'any',
    tags: 'any',
    name: 'any',
    description: 'any',
    photos: 'any',
    status: 'any',
    contact: 'any',
  });

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch and populate data from your API here and set it in setSearchResults
    // For now, using sampleData for demonstration
    setSearchResults(SampleData);
  }, []);

  const filterPets = () => {
    let filteredData = [...SampleData];
    console.log(filteredData)

    // Filter by pet type
    if (filters.petType !== 'any') {
      filteredData = filteredData.filter((pet) => pet.type === filters.petType);
    }

    // Filter by breed
    if (filters.breed !== 'any') {
      filteredData = filteredData.filter((pet) => pet.breeds.primary === filters.breed);
    }

    // Filter by age
    if (filters.age !== 'any') {
      filteredData = filteredData.filter((pet) => pet.age === filters.age);
    }

    // Filter by gender
    if (filters.gender !== 'any') {
      filteredData = filteredData.filter((pet) => pet.gender === filters.gender);
    }

    // Filter by size
    if (filters.size !== 'any') {
      filteredData = filteredData.filter((pet) => pet.size === filters.size);
    }

    // Filter by coat
    if (filters.coat !== 'any') {
      filteredData = filteredData.filter((pet) => pet.coat === filters.coat);
    }

    // Filter by tags
    if (filters.tags !== 'any') {
      filteredData = filteredData.filter((pet) => pet.tags.includes(filters.tags));
    }

    // Filter by name
    if (filters.name !== 'any') {
      filteredData = filteredData.filter((pet) => pet.name === filters.name);
    }

    // Filter by description
    if (filters.description !== 'any') {
      filteredData = filteredData.filter((pet) => pet.description === filters.description);
    }

    // Filter by photos
    if (filters.photos !== 'any') {
      filteredData = filteredData.filter((pet) => pet.photos.some((photo) => photo === filters.photos));
    }

    // Filter by status
    if (filters.status !== 'any') {
      filteredData = filteredData.filter((pet) => pet.status === filters.status);
    }

    // Filter by contact
    if (filters.contact !== 'any') {
      filteredData = filteredData.filter((pet) => pet.contact.email === filters.contact);
    }

    setSearchResults(filteredData);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });

    filterPets();
  };

  return (
    <div className="main-page">
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="sidebar">
        <div className="filters">
          <Filter filters={filters} onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="content">
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
