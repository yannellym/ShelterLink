// search bar in the homepage
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Link } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [petType, setPetType] = useState('');
  const [showLocationMessage, setShowLocationMessage] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchText || !petType) {
      alert('Please enter both location and pet type to search.');
      return;
    }
  
    let location;
    let searchTextForApi;
  
    if (isZipCode(searchText)) {
      // If the input is a zipcode, use it directly
      location = searchText;
      searchTextForApi = searchText;
    } else {
      // If the input is a city or city and state, extract the city/state
      const cityStateRegex = /([^,]+),?\s*([^,]+)?/;
      const match = searchText.match(cityStateRegex);
  
      if (match) {
        const [city, state] = match[0].split(" ").map(part => part.replace(',', '').toUpperCase());
      
        if (!state) {
          let newLocation;
          
          // Keep prompting the user until valid input is provided
          do {
            // If no state is provided, prompt the user to enter both city and state
            const newAns = prompt('Please enter the state along with the city (e.g., City, State):');
            
            if (!newAns) {
              // If the user cancels or doesn't provide a new state, return
              return;
            }
      
            // Normalize the user's input for city and state
            const [newCity, newState] = newAns.split(" ").map(part => part.replace(',', '').toUpperCase());
      
            if (newCity && newState) {
              newLocation = `${newCity},${newState}`;
              searchTextForApi = `${newCity}, ${newState}`;
            } else {
              alert('Invalid input. Please enter the city and state in the correct format.');
            }
          } while (!newLocation); // Continue until valid input is provided
      
          location = newLocation;
        } else {
          location = `${city},${state}`;
          searchTextForApi = `${city}, ${state}`;
        }
      } else {
        alert('Please enter a valid city and state or a zipcode to search.');
        return;
      }
    }
    const apiEndpoint = `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/pet_zip_search?location=${location}&type=${petType}`;

    try {
      const response = await fetch(apiEndpoint);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data, 'data');
  
        // Include the favorited information in the state
        navigate('/location-specific-pets', {
          state: {
            petType,
            searchText: searchTextForApi,
          },
        });
      } else {
        console.error('API request failed:', response.statusText);
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };
  

  function isZipCode(text) {
    return /^\d{5}$/.test(text);
  }

  const handleSelect = async (address) => {
    setSearchText('');
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

  const handleInputClick = () => {
    setShowLocationMessage(true);
  };

  const isSearchDisabled = !searchText || !petType;

  return (
    <div className="search-bar">
      <PlacesAutocomplete
        value={searchText}
        onChange={setSearchText}
        onSelect={handleSelect}
        searchOptions={searchOptions}
        disableSearch={true} 
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
                className="location-button"
                onClick={handleShareLocation}
              >
                {shareLocation? 'Sharing Location...' : 'Share Location 📍'}
              </button>
            )}
          </div>
        )}
      </PlacesAutocomplete>

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
  );
};

export default SearchBar;