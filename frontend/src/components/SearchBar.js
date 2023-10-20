import React, { useState } from 'react';
import '../styles/SearchBar.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Link } from 'react-router-dom';


const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [petType, setPetType] = useState('');
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [showLocationMessage, setShowLocationMessage] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  const handleSearch = async () => {
    if (searchText && petType) {
      const apiEndpoint = `http://localhost:3002/api/petfinder?perPage=100&location=${searchText}&type=${petType}`;

      try {
        const response = await fetch(apiEndpoint);
        if (response.ok) {
          const data = await response.json();
          setDataLoaded(true); // Data has been loaded
        } else {
          console.error('API request failed:', response.statusText);
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    } else {
      alert('Please enter both location and pet type to search.');
    }
  }

  
  function isZipCode(text) {
    // \check if the input is a 5-digit number
    return /^\d{5}$/.test(text);
  }

  const handleSelect = async (address, placeId) => {
    if (isZipCode(address)) {
      // If the input is a 5-digit number (ZIP code), show the location options
      setShowLocationOptions(true);
      setSearchText(address);
    } else {
      // Hide the location options
      setShowLocationOptions(false);
      // Handle the address as before
      try {
        const results = await geocodeByAddress(address);
        const cityState = results[0].address_components.reduce((acc, component) => {
          if (component.types.includes('locality')) {
            acc.city = component.long_name;
          } else if (component.types.includes('administrative_area_level_1')) {
            acc.state = component.short_name;
          }
          return acc;
        }, {});

        if (cityState.city && cityState.state) {
          setSearchText(`${cityState.city}, ${cityState.state}`);
        } else {
          setSearchText(address);
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
      }
    }
  };

  // Customize the autocomplete suggestions to show only places within the USA
  const searchOptions = {
    types: isZipCode(searchText) ? ['(regions)'] : ['(cities)'],
    componentRestrictions: { country: 'us' }, // Limit to the USA
  };


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
        alert(`Error getting location: ${error.message}`);
      });
    } else {
      alert("Geolocation is not supported in your browser");
    }
  };

  const handleInputClick = () => {
    setShowLocationMessage(true);
    handleShareLocation();
  };
  
  const handleLocationOptionClick = () => {
    handleShareLocation();
    setShowLocationOptions(false);
  };

  return (
    <div className="search-bar">
    <div className="search-container">
    <div className="search-input-container">
      <PlacesAutocomplete
        value={searchText}
        onChange={setSearchText}
        onSelect={handleSelect}
        searchOptions={searchOptions}
        >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Enter zipcode, city, or state',
                className: 'search-input',
                onClick: handleInputClick,
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => (
                <div
                  {...getSuggestionItemProps(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
            {showLocationMessage && (
              <div className="location-message" onClick={handleShareLocation}>
                Share your location 📍
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>
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
    <button onClick={handleSearch} className="search-button">
      <Link to="/pets-specific-location">
        <button className="search-button">Search</button>
      </Link>
    </button>
  </div>
</div>
);
};

export default SearchBar;
