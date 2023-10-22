import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import PetCard from './PetCard';
import Filter from './Filter';

function MainPage({ favoritePets, addToFavorites, removeFromFavorites }) {
  // State variables
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [cachedData, setCachedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const maxPaginationButtons = 10; 

  // Filters state
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'any',
    breed: 'any',
    age: 'any',
    gender: 'any',
    size: 'any',
    coat: 'any',
  });

  // Function to fetch pets for a specific page
  const fetchPetsForPage = async (page, filters) => {
    try {
      let endpoint = `http://localhost:3002/api/petfinder?page=${page}&perPage=${itemsPerPage}`;
  
      // Add filter parameters to the API request
      for (const filterKey in filters) {
        if (filters[filterKey] !== 'any') {
          endpoint += `&${filterKey}=${filters[filterKey]}`;
        }
      }
  
      const response = await fetch(endpoint);
      const data = await response.json();
  
      console.log('API Response:', data);
  
      if (data && data.animals) {
        // Set the cached data to the new data
        setCachedData(data.animals);
        setSearchResults(applyFilters(data.animals, filters)); // Apply filters to the new data
        setLoading(false);
        setCurrentPage(page);
        setTotalPages(data.pagination.total_pages);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch pets for the initial page when the component mounts
    fetchPetsForPage(currentPage);
  }, []);

  const handlePageChange = (page) => {
    // Set loading to true before changing the page
    setLoading(true);

    // Delay fetching data and scrolling to the top
    setTimeout(() => {
      fetchPetsForPage(page);

      // After the data is loaded, scroll to the top
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, 500); // 500 milliseconds (0.5 second) delay
  };

  const handleFilterChange = async (newFilters) => {
    // Clear the cached data and search results
    setCachedData([]);
    setSearchResults([]);
    // Set loading to true before fetching new data (this will allow our "looking through" message to display)
    setLoading(true);
    // Update selected filters
    setSelectedFilters(newFilters);
  
    // Fetch new data based on the updated filters
    try {
      // Construct the API endpoint based on selected filter values
      let endpoint = `http://localhost:3002/api/petfinder?page=${currentPage}&perPage=${itemsPerPage}`;
      for (const filterKey in newFilters) {
        if (newFilters[filterKey] !== 'any') {
          endpoint += `&${filterKey}=${newFilters[filterKey]}`;
        }
      }
  
      const response = await fetch(endpoint);
      const data = await response.json();
  
      console.log('API Response:', data);
  
      if (data && data.animals) {
        // Add the fetched data to the cache
        setCachedData(data.animals);
        setSearchResults(applyFilters(data.animals, newFilters));
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  };
  
  
// Function to filter pet data based on selected filters
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
      } else {
        // For other filters, compare values directly
        if (petValue !== filterValue) {
          matchesAllFilters = false;
          break; // Exit the loop early if there's no match
        }
      }
    }

    // If the pet matches all filters, include it in the results
    return matchesAllFilters;
  });
};

// Function to render the list of pet cards based on applied filters
const renderPetCards = () => {
  if (loading) {
    return <p>Looking through all of our amazing pets...</p>;
  } else {
    // Apply filters to the cached data
    const filteredResults = applyFilters(cachedData, selectedFilters);

    // Check if there are matching pets after applying filters
    if (filteredResults.length > 0) {
      return filteredResults.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          isFavorite={favoritePets.some((favoritePet) => favoritePet.id === pet.id)}
        />
      ));
    } else {
      // If no matching pets, display a message
      return <p>No pets match your criteria.</p>;
    }
  }
};

// Function to generate pagination buttons for navigating between pages
const generatePaginationButtons = () => {
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
};


  return (
    <div className="main-page">
      <div className="sidebar">
        <div className="filters">
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="content">
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

export default MainPage;
