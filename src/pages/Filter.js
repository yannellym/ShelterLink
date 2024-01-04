import React, { useState } from 'react';
import popularDogBreeds from '../data/popularDogBreeds';
import stateNames from '../data/stateNames';

// component to filter for pets based on user preferences
function Filter({ onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState({
    location: 'any',
    type: 'any',
    breed: 'any',
    age: 'any',
    gender: 'any',
    size: 'any',
    coat: 'any',
  });
  
  /* function to handle the selection of the given filter by the user. Calls onFilterChanged
  parameters: filterName: String, event: onClickEvent
  returns: None
  */
  const handleFilterSelect = (filterName, event) => {
    const selectedValue = event.target.value;

    // Check if the filterName is "breed" and if the selectedValue is not "any"
    if (filterName === 'breed' && selectedValue !== 'any') {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        breed: selectedValue, // Set the breed filter to the selected value
      }));
      // Call the parent component's function to update filters
      onFilterChange({
        ...selectedFilters,
        breed: selectedValue,
      });
    } else {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: selectedValue,
      }));
      // Call the parent component's function to update filters
      onFilterChange({
        ...selectedFilters,
        [filterName]: selectedValue,
      });
    }
  };

  // component to render the filters for user to filter animals by preference
  const renderFilters = () => {
    if (selectedFilters.type === 'cat') {
      return (
        <>
          <div className="filter-group">
            <label htmlFor="age">Age:</label>
            <select
              id="age"
              value={selectedFilters.age}
              onChange={(event) => handleFilterSelect('age', event)}
            >
              <option value="any">Any</option>
              <option value="baby">Baby</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="size">Size:</label>
            <select
              id="size"
              value={selectedFilters.size}
              onChange={(event) => handleFilterSelect('size', event)}
            >
              <option value="any">Any</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xlarge">X-Large</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={selectedFilters.gender}
              onChange={(event) => handleFilterSelect('gender', event)}
            >
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="filter-group">
            <label htmlFor="breed">Breed:</label>
            <select
              id="breed"
              value={selectedFilters.breed}
              onChange={(event) => handleFilterSelect('breed', event)}
            >
              <option value="any">Any</option>
              {popularDogBreeds.map((breed, index) => (
                <option key={index} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="age">Age:</label>
            <select
              id="age"
              value={selectedFilters.age}
              onChange={(event) => handleFilterSelect('age', event)}
            >
              <option value="any">Any</option>
              <option value="baby">Baby</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={selectedFilters.gender}
              onChange={(event) => handleFilterSelect('gender', event)}
            >
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="size">Size:</label>
            <select
              id="size"
              value={selectedFilters.size}
              onChange={(event) => handleFilterSelect('size', event)}
            >
              <option value="any">Any</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xlarge">X-Large</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="coat">Coat:</label>
            <select
              id="coat"
              value={selectedFilters.coat}
              onChange={(event) => handleFilterSelect('coat', event)}
            >
              <option value="any">Any</option>
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
              <option value="wire">Wire</option>
              <option value="hairless">Hairless</option>
              <option value="curly">Curly</option>
            </select>
          </div>
        </>
      );
    }
  };

  return (
    <div className="filters">
    <h2>Filters</h2>
    <div className="filter-group">
    <label htmlFor="location">Location:</label>
      <select
        id="location"
        value={selectedFilters.location}
        onChange={(event) => handleFilterSelect('location', event)}
      >
        {/* Map over the stateNames array to generate <option> elements */}
        {stateNames.map((state) => (
          <option key={state.value} value={state.value}>
            {state.label}
          </option>
        ))}
      </select>
      <label htmlFor="type">Type:</label>
      <select
        id="type"
        value={selectedFilters.type}
        onChange={(event) => handleFilterSelect('type', event)}
      >
        <option value="any">Any</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
      </select>
    </div>
    {renderFilters()}
  </div>
);
};
  
export default Filter;