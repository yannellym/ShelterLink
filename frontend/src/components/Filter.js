import React from 'react';

function Filter({ filters, onFilterChange }) {
  const handleFilterSelect = (filterName, event) => {
    onFilterChange(filterName, event.target.value);
  };
  return (
    <div className="filters">
      <h2>Filters</h2>
      <select value={filters.size} onChange={(event) => handleFilterSelect('size', event)}>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <select value={filters.breed} onChange={(event) => handleFilterSelect('breed', event)}>
        <option value="breed1">Breed 1</option>
        <option value="breed2">Breed 2</option>
        {/* Add more breed options */}
      </select>
      <select value={filters.age} onChange={(event) => handleFilterSelect('age', event)}>
        <option value="puppy">Puppy</option>
        <option value="adult">Adult</option>
        <option value="senior">Senior</option>
      </select>
      <select value={filters.gender} onChange={(event) => handleFilterSelect('gender', event)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select value={filters.shelter} onChange={(event) => handleFilterSelect('shelter', event)}>
        <option value="shelter1">Shelter 1</option>
        <option value="shelter2">Shelter 2</option>
        {/* Add more shelter options */}
      </select>
    </div>
  );
};

export default Filter;
