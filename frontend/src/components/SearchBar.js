import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [petType, setPetType] = useState('');
  const [showLocationOptions, setShowLocationOptions] = useState(false);

  const handleSearch = async () => {
    if (searchText && petType) {
      // Both location and type are provided, so we can query the API
      const apiEndpoint = `http://localhost:3002/api/petfinder?perPage=100&location=${searchText}&type=${petType}`;
      
      try {
        const response = await fetch(apiEndpoint);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          onSearch(data);
        } else {
          console.error('API request failed:', response.statusText);
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    } else {
      // Location or type is missing, so you can display an error message or prevent the search
      alert('Please enter both location and pet type to search.');
    }
  };
  
  
  function isZipCode(text) {
    // \check if the input is a 5-digit number
    return /^\d{5}$/.test(text);
  }
  

  const handleShareLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { coords } = position;
          const { latitude, longitude } = coords;

          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const zipCode = data.address.postcode;

          if (zipCode) {
            setSearchText(zipCode);
          }
        } catch (error) {
          console.error("Error getting zip code:", error);
        }
      }, (error) => {
        // Handle any errors
        alert(`Error getting location: ${error.message}`);
      });
    } else {
      alert("Geolocation is not supported in your browser");
    }
  };

  const handleInputClick = () => {
    setShowLocationOptions(!showLocationOptions); // Toggle the display of the location options
  };

  const handleLocationOptionClick = () => {
    handleShareLocation();
    setShowLocationOptions(false);
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Enter zipcode, city, or state"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onClick={handleInputClick}
            className="search-input"
          />
          {showLocationOptions && (
            <div className="location-option" onClick={handleLocationOptionClick}>
              Share Location
            </div>
          )}
        </div>
        <select
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          className="search-select"
        >
          <option value="">Select pet type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="horse">Horse</option>
          <option value="bird">Bird</option>
          <option value="furry">Furry</option>
          <option value="barnyard">Barnyard</option>
        </select>
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
