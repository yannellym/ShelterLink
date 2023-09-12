import React from 'react';
import popularDogBreeds from './popularDogBreeds';

function Filter({ filters, onFilterChange }) {
  // Check if filters is undefined or null, and provide a default value if necessary
  filters = filters || { type: 'any', breed: 'any', age: 'any', gender: 'any', size: 'any', coat: 'any' };

  const handleFilterSelect = (filterName, event) => {
    const selectedValue = event.target.value;
    
    if (filterName === 'type') {
      // If "type" changes, reset all other filters
      onFilterChange('breed', 'any');
      onFilterChange('age', 'any');
      onFilterChange('gender', 'any');
      onFilterChange('size', 'any');
      onFilterChange('coat', 'any');
    }
    onFilterChange('type', selectedValue);
    
  };
  
  const renderDogFilters = () => {
    return (
      <>
        <div className="filter-group">
          <label htmlFor="breed">Breed:</label>
          <select
            id="breed"
            value={filters.breed}
            onChange={(event) => handleFilterSelect('breed', event)}
          >
            <option value="any">Any</option>
            {popularDogBreeds.map((breed, index) => (
            <option key={index} value={breed.toLowerCase()}>
              {breed}
            </option>
          ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="age">Age:</label>
          <select
            id="age"
            value={filters.age}
            onChange={(event) => handleFilterSelect('age', event)}
          >
            <option value="any">Any</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={filters.gender}
            onChange={(event) => handleFilterSelect('gender', event)}
          >
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="size">Size:</label>
          <select
            id="size"
            value={filters.size}
            onChange={(event) => handleFilterSelect('size', event)}
          >
            <option value="any">Any</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            {/* Add more size options based on  API data */}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="coat">Coat:</label>
          <select
            id="coat"
            value={filters.coat}
            onChange={(event) => handleFilterSelect('coat', event)}
          >
            <option value="any">Any</option>
            <option value="short">Short</option>
            <option value="long">Long</option>
            {/* Add more coat options based on  API data */}
          </select>
        </div>
        {/* Add more dog-specific filters here */}
      </>
    );
  };

  const renderCatFilters = () => {
    return (
      <>
      <div className="filter-group">
        <label htmlFor="age">Age:</label>
        <select
          id="age"
          value={filters.age}
          onChange={(event) => handleFilterSelect('age', event)}
        >
          <option value="any">Any</option>
          <option value="kitten">Kitten</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="size">Size:</label>
        <select
          id="size"
          value={filters.size}
          onChange={(event) => handleFilterSelect('size', event)}
        >
          <option value="any">Any</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={filters.gender}
          onChange={(event) => handleFilterSelect('gender', event)}
        >
          <option value="any">Any</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
      {/* Add more cat-specific filters here */}
    </>
  );
};

  return (
    <div className="filters">
    <h2>Filters</h2>
    <div className="filter-group">
      <label htmlFor="type">Type:</label>
      <select
        id="type"
        value={filters.type}
        onChange={(event) => handleFilterSelect('type', event)}
      >
        <option value="any">any</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
      </select>
    </div>
    {/* Render dog filters if type is "dog" */}
    {console.log(filters.type, "filter type")}
    {filters.type?.toLowerCase() === 'dog' && renderDogFilters()}
    {filters.type?.toLowerCase() === 'cat' && renderCatFilters()}

  </div>
);
}


export default Filter;
