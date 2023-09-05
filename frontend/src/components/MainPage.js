import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import SearchBar from './SearchBar';
import PetCard from './PetCard';
import Filter from './Filter';
import SampleData from './SampleData';

function MainPage({ onFilterChange }) {
  const initialFilters = {
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
  };

  const [filters, setFilters] = useState(initialFilters);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // When the component mounts or filters change, filter the data
    filterPets(filters);
  }, [filters]);

  const filterPets = (filters) => {
    let filteredData = [...SampleData];
    
    console.log('filtered data' , filteredData)
    console.log('Current filters.type:', filters.type);

    // Filter by pet type
    if (filters.type !== 'any') {
      filteredData = filteredData.filter((pet) => pet.type.toLowerCase() === filters.type.toLowerCase());
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

    // Filter by contact
    if (filters.contact !== 'any') {
      filteredData = filteredData.filter((pet) => pet.contact.email.toLowerCase() === filters.contact);
    }
    setSearchResults(filteredData);
  };

  const handleFilterChange = (filterName, value) => {
    const updatedFilters = { ...filters, [filterName]: value };
    setFilters(updatedFilters);
  };

  return (
    <div className="main-page">
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
