import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import PetCard from '../components/PetCard';
import Filter from './Filter';

/* component that allows user to search for pets based on given filters
  parameters: favoritePets: array, addToFavorites: array, removeFromFavorites:array, isAuthenticated: string
  returns: None
*/
function FindApet({ favoritePets, addToFavorites, removeFromFavorites, isAuthenticated }) {
  // State variables
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [totalPages, setTotalPages] = useState(0);
  const maxPaginationButtons = 9;

  const [showOnlyPetsWithImages, setShowOnlyPetsWithImages] = useState(false);

  const [latitude, setLatitude]  = useState(null);
  const [longitude, setLongitude]  = useState(null);

  // Filters state
  const [selectedFilters, setSelectedFilters] = useState({
    location: 'any',
    type: 'any',
    breed: 'any',
    age: 'any',
    gender: 'any',
    size: 'any',
    coat: 'any',
  });
  
  useEffect(() => {
    // Check if the Geolocation API is supported by the browser
    if ("geolocation" in navigator) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // set the latitude and longitude
          setLatitude(latitude);
          setLongitude(longitude);
          console.log("User's location:", latitude, longitude);

          // Call the API with the selected filters after getting the user's location
          fetchPetsForPage(currentPage, selectedFilters, latitude, longitude);
        },
        (error) => {
          console.error("Error getting user's location:", error.message);
          setLoading(false); // Set loading to false in case of an error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false); // Set loading to false if Geolocation is not supported
    }
  }, [currentPage, selectedFilters, showOnlyPetsWithImages]);
  
  /* function fetches animals for current page
    parameters: page: int, filters: object, lat: long, lon: long
    returns: None
  */

  //TODO: OPTIMIZE THIS FUNCTION FOR QURYING BASED ON FILTERS. REMOVE APPLY FILTERS
  const fetchPetsForPage = async (page, filters, lat, lon) => {
    // call the api with the given filters by the user
    try {
      // if the user has selected to only show pets with images, limit the pets to 60, else pets per page
      let endpoint = `https://iyank5vavf.execute-api.us-east-1.amazonaws.com/default/lambdaapi-dev?page=${page}&location=${lat},${lon}&limit=${showOnlyPetsWithImages ? 60 : itemsPerPage}`;
      
      // for every filter that the user has selected, attach it to the endpoint to fetch our data
      for (const filterKey in filters) {
        if (filters[filterKey] !== 'any') {
          endpoint += `&${filterKey}=${filters[filterKey]}`;
        }
      }
      const response = await fetch(endpoint);
      const data = await response.json();
      // if we get animals back, apply all the filters by the user
      if (data && data.animals) {
        const filteredResults = applyFilters(data.animals, filters);
        setLoading(false);
        setCurrentPage(page);
        setTotalPages(data.pagination.total_pages);
        setSearchResults(filteredResults);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call the API when the user's location changes
    if (latitude !== null && longitude !== null) {
      fetchPetsForPage(currentPage, selectedFilters, latitude, longitude);
    }
  }, [currentPage, selectedFilters, showOnlyPetsWithImages, latitude, longitude]);

  /* function to handle the user's request to change pages. Fecthes pets and scrolls to top of page. 
    parameters: page: int
    returns: None
  */
  const handlePageChange = (page) => {
    // Set loading to true before changing the page
    setLoading(true);
    // Delay fetching data and scrolling to the top
    setTimeout(() => {
      fetchPetsForPage(page, selectedFilters, latitude, longitude);
      // After the data is loaded, scroll to the top
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, 500); // 500 milliseconds (0.5 second) delay
  };

  /* function to handle the user changing the filters. Empties the search results and sets the new filters. 
    parameters: page: int
    returns: None
  */
  //TODO: OPTIMIZE THIS FUNCTION FOR QURYING BASED ON FILTERS. REMOVE APPLY FILTERS
  const handleFilterChange = async (newFilters) => {
    setSearchResults([]);
    // Set loading to true before fetching new data (this will allow our "looking through" message to display)
    setLoading(true);
    // Update selected filters
    setSelectedFilters(newFilters);
    // Set the current page to 1 when filters change
    setCurrentPage(1);
    // Fetch new data based on the updated filters
    try {
      // Construct the API endpoint based on selected filter values
      let endpoint = `https://iyank5vavf.execute-api.us-east-1.amazonaws.com/default/lambdaapi-dev?page=1&limit=${50}`;
      // for every filter selected, attach it to our query string
      for (const filterKey in newFilters) {
        if (newFilters[filterKey] !== 'any') {
          endpoint += `&${filterKey}=${newFilters[filterKey]}`;
        }
      }

      const response = await fetch(endpoint);
      const data = await response.json();
      
      // if we have animals, apply the filters given by the user
      if (data && data.animals) {
        // Apply filters to the new data, including the "showOnlyPetsWithImages" filter
        const filteredResults = applyFilters(data.animals, newFilters);
        // if we have pets after filtering,
        if (filteredResults.length > 0) {
          // set the search results and total pages
          setSearchResults(filteredResults);
          setTotalPages(data.pagination.total_pages);
        } else {
          // If there are no matching pets, set the total pages to 0
          setTotalPages(0);
        }
        // remove loading indicator
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  };
  

  /* Function to apply the filters to our data source
    parameters: data: object, filters: array
    returns: Object (matched pet)
  */
  const applyFilters = (data, filters) => {
    return data.filter((pet) => {

      let matchesAllFilters = true;
      // Loop through each filter to check if the pet matches the criteria
      for (const filterKey in filters) {
        // Get the filter value and pet value, converting both to lowercase for case-insensitive comparison
        const filterValue = filters[filterKey]?.toLowerCase();
        const petValue = pet[filterKey]?.toLowerCase();

        // If the filter value is "any," skip this filter
        if (filterValue === 'any') {
          continue;
        }
        // Special handling for the "type" filter to handle both "Cat" and "Dog"
        if (filterKey === 'type') {
          if (filterValue === 'cat' && petValue !== 'cat') {
            matchesAllFilters = false;
            break; // Exit the loop early if there's no match
          }
          if (filterValue === 'dog' && petValue !== 'dog') {
            matchesAllFilters = false;
            break; // Exit the loop early if there's no match
          }
        } else if (filterKey === 'breed') {
          if (
            filterValue !== 'any' &&
            petValue &&
            !(
              petValue.primary.toLowerCase().includes(filterValue) ||
              (petValue.secondary && petValue.secondary.toLowerCase().includes(filterValue))
            )
          ) {
            matchesAllFilters = false;
            break;
          }
        } else if (filterKey === 'location') {
            // Special handling for the "location" filter based on the pet's contact address state
            const petState = pet.contact?.address?.state?.toLowerCase();
            if (petState !== filterValue) {
              matchesAllFilters = false;
              break;
            }
        } else {
          // For other filters, compare values directly
          if (petValue !== filterValue) {
            matchesAllFilters = false;
            break; // Exit the loop early if there's no match
          }
        }
      }
      // Filter pets with images
      if (showOnlyPetsWithImages && (!pet.photos || pet.photos.length === 0)) {
        matchesAllFilters = false;
      }
      // If the pet matches all filters, include it in the results
      return matchesAllFilters;
    });
  };

  /* Function to render all of the pet cards
    parameters: 
    returns: PetCard if pet in searchResults, otherwise returns a paragraph element
  */
  const renderPetCards = () => {
    if (loading) {
      return <p>Looking through all of our amazing pets...</p>;
    } else {
      if (searchResults.length > 0) {
        // If there are matching pets, display the pet cards
        return searchResults.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isFavorite={favoritePets.some((favoritePet) => favoritePet.id === pet.id)}
            isAuthenticated={isAuthenticated}
          />
        ));
      } else {
        // If there are no matching pets, display a message and set total pages to 0
        setTotalPages(0);
        return <p>No pets match your criteria.</p>;
      }
    }
  };

  /* Function to generate the pagination for the component
    parameters:
    returns: array for pagination if we received more than one page of results, else Null
  */
  const generatePaginationButtons = () => {
    // if we received more than one page of data
    if (totalPages > 1) {
      const buttons = [];
      // Calculate the starting and ending page numbers to display
      const startPage = Math.max(1, currentPage - Math.floor(maxPaginationButtons / 2));
      const endPage = Math.min(totalPages, startPage + maxPaginationButtons - 1);

      // Iterate through the pages and create buttons for each page
      for (let page = startPage; page <= endPage; page++) {
        buttons.push(
          <button
            key={page}
            onClick={() => handlePageChange(page)} // Set an onClick handler to change the page
            className={currentPage === page ? 'active' : ''} // Apply the 'active' class to the current page
          >
            {page} {/* Display the page number as button text */}
          </button>
        );
      }
      return buttons; // Return the generated pagination buttons
    } else {
      // If there's only one page or no pages, return null to hide the buttons
      return null;
    }
  };
  
  /* Function to handle the user;s selection of only showing pets with images
    parameters: 
    returns: Object (matched pet)
  */
  // TODO: REVISE FUNCTION 
  const handleShowOnlyPetsWithImages = async () => {
    // Toggle the value of showOnlyPetsWithImages
    const updatedShowOnlyPetsWithImages = !showOnlyPetsWithImages;
    // Apply filters to the cached data
    const filteredResults = applyFilters(searchResults, selectedFilters);
    // Apply the "Show only pets with images" filter
    let filteredPets = filteredResults;
    // if we have pets with images after filtering
    if (updatedShowOnlyPetsWithImages) {
      filteredPets = filteredResults.filter((pet) => pet.photos && pet.photos.length > 0);
    }
    // Update both showOnlyPetsWithImages and searchResults together
    setShowOnlyPetsWithImages(updatedShowOnlyPetsWithImages);
    setSearchResults(filteredPets);
    // Reset the current page to 1 when applying the "Show only pets with images" filter
    setCurrentPage(1);
  };
  
  return (
    <div className="main-page">
      <div className="sidebar">
        <div className="filters">
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="content">
        <div className="filter-pets">
          <label>
            <input
              type="checkbox"
              checked={showOnlyPetsWithImages}
              onChange={handleShowOnlyPetsWithImages}
            />
            Show only pets with images
          </label>
        </div>
        <div className="pet-card-list">
          {renderPetCards()}
        </div>
        <div className="pagination-horizontal">
          {generatePaginationButtons()}
        </div>
      </div>
    </div>
  );
}

export default FindApet;
