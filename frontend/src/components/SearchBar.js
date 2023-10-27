import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';
import PlacesAutocomplete, {
  geocodeByAddress
} from 'react-places-autocomplete';
import { Link } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [petType, setPetType] = useState('');
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [showLocationMessage, setShowLocationMessage] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [locationButtonClicked, setLocationButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchText && petType) {
      const apiEndpoint = `http://localhost:3002/api/petfinder?perPage=200&location=${searchText}&type=${petType}`;

      try {
        const response = await fetch(apiEndpoint);
        if (response.ok) {
          const data = await response.json();
          console.log(data, "data");
          setDataLoaded(true);

          // Include the favorited information in the state
          navigate('/location-specific-pets', {
            state: {
              petType,
              searchText
            },
          });
        } else {
          console.error('API request failed:', response.statusText);
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    } else {
      alert('Please enter both location and pet type to search.');
    }
  };

  function isZipCode(text) {
    return /^\d{5}$/.test(text);
  }

  const handleSelect = async (address, placeId) => {
    setSearchText('');
    setShowLocationOptions(false);
    setSearchText(address);
  }

  const searchOptions = {
    types: isZipCode(searchText) ? ['(regions)'] : ['(cities)'],
    componentRestrictions: { country: 'us' },
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
        } finally {
          setLocationButtonClicked(true);
        }
      }, (error) => {
        alert(`Error getting location: ${error.message}`);
      });
    } else {
      alert("Geolocation is not supported in your browser");
    }
  };

  useEffect(() => {
    if (locationButtonClicked) {
      // Once the location is shared, you can change the button's message
      setShowLocationMessage(false);
    }
  }, [locationButtonClicked]);

  const handleInputClick = () => {
    setShowLocationMessage(true);
    handleShareLocation();
  };

  const isSearchDisabled = !searchText || !petType;

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
                  <button
                    className={`location-button ${locationButtonClicked ? 'blue-border' : ''}`}
                    onClick={handleShareLocation}
                  >
                    Share Location 📍
                  </button>
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
          <option value="barnyard">Barnyard</option>
        </select>
        <Link to="/location-specific-pets">
          <button
            className={`search-button ${isSearchDisabled ? 'search-button-disabled' : ''}`}
            onClick={handleSearch}
            disabled={isSearchDisabled}
          >
            Search
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
