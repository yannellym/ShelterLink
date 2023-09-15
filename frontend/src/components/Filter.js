import React, { useState } from 'react';
import popularDogBreeds from './popularDogBreeds';

function Filter({ onSearchClick }) {
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'any',
    breed: 'any',
    age: 'any',
    gender: 'any',
    size: 'any',
    coat: 'any',
  });

  const handleFilterSelect = (filterName, event) => {
    const selectedValue = event.target.value;

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: selectedValue,
    }));
  };

  const handleSearchClick = () => {
    // Pass the selected filters to the parent component to trigger the search
    onSearchClick(selectedFilters);
  };



  const renderDogFilters = () => {
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
  };

  const renderCatFilters = () => {
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
        {/* Add more cat filters here */}
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
          value={selectedFilters.type}
          onChange={(event) => handleFilterSelect('type', event)}
        >
          <option value="any">Any</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
      </div>
      {/* Render dog filters if type is "dog" */}
      {selectedFilters.type?.toLowerCase() === 'dog' && renderDogFilters()}
      {/* Render cat filters if type is "cat" */}
      {selectedFilters.type?.toLowerCase() === 'cat' && renderCatFilters()}

      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}

export default Filter;