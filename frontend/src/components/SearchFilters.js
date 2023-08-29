// SearchFilters.js
import React from 'react';
import '../styles/SearchFilters.css'; 


function SearchFilters({ breeds, sizes, ages, types, onFilterChange }) {
  return (
    <div className="search-filters">
      <div className="search-section">
        {/* Type of pet select */}
        <select onChange={onFilterChange}>
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="search-section">
        {/* City input */}
        <input type="text" id="cityInput" placeholder="City, State, or Zip Code" />

        {/* Button */}
        <button className="search-button">Search</button>
      </div>
    </div>
  );
}

export default SearchFilters;
