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
  const [shareLocation, setShareLocation] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchText && petType) {
      // Extract the ZIP code from the user's input
      const zipCode = searchText.match(/\b\d{5}\b/);
      console.log(zipCode)
      if (zipCode) {
        const apiEndpoint = `http://localhost:3002/api/petfinder?perPage=200&location=${zipCode}&type=${petType}`;
  
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
                searchText: zipCode[0] // Set searchText to the extracted ZIP code
              },
            });
          } else {
            console.error('API request failed:', response.statusText);
          }
        } catch (error) {
          console.error('API request error:', error);
        }
      } else {
        alert('Please enter a valid ZIP code to search.');
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

  const handleShareLocation = async () => {
    setShareLocation(true);
  
    if ("geolocation" in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
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
    } else {
      alert("Geolocation is not supported in your browser");
    }
  
    // Reset the button text after sharing location
    setShowLocationMessage(false);
  };

  useEffect(() => {
    if (locationButtonClicked) {
      setShowLocationMessage(false);
    }
  }, [locationButtonClicked]);

  const handleInputClick = () => {
    setShowLocationMessage(true);
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
                    {shareLocation? 'Sharing Location...' : 'Share Location 📍'}
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
