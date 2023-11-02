import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import PetCard from '../components/PetCard';
import Filter from './Filter';

function FindApet({ favoritePets, addToFavorites, removeFromFavorites }) {
  // State variables
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [totalPages, setTotalPages] = useState(0);
  const maxPaginationButtons = 9; // Change the maximum number of pagination buttons

  const [showOnlyPetsWithImages, setShowOnlyPetsWithImages] = useState(false);
  const [minPetsPerPage] = useState(20); // Minimum number of pets per page

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
      let endpoint = `http://localhost:3002/api/petfinder?page=${page}&limit=${showOnlyPetsWithImages ? 60 : itemsPerPage}`;

      // Add filter parameters to the API request
      for (const filterKey in filters) {
        if (filters[filterKey] !== 'any') {
          endpoint += `&${filterKey}=${filters[filterKey]}`;
        }
      }

      const response = await fetch(endpoint);
      const data = await response.json();

      if (data && data.animals) {
        setSearchResults(applyFilters(data.animals, filters)); // Apply filters to the new data
        // remove the loading indicator
        setLoading(false);
        // set the new data
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
    fetchPetsForPage(currentPage, selectedFilters);
  }, []);

  const handlePageChange = (page) => {
    // Set loading to true before changing the page
    setLoading(true);

    // Delay fetching data and scrolling to the top
    setTimeout(() => {
      fetchPetsForPage(page, selectedFilters);

      // After the data is loaded, scroll to the top
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, 500); // 500 milliseconds (0.5 second) delay
  };

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
      let endpoint = `http://localhost:3002/api/petfinder?page=1&limit=${50}`;
      for (const filterKey in newFilters) {
        if (newFilters[filterKey] !== 'any') {
          endpoint += `&${filterKey}=${newFilters[filterKey]}`;
        }
      }
  
      const response = await fetch(endpoint);
      const data = await response.json();
  
      console.log('API Response:', data);
  
      if (data && data.animals) {
  
        // Apply filters to the new data, including the "showOnlyPetsWithImages" filter
        const filteredResults = applyFilters(data.animals, newFilters);
  
        if (filteredResults.length > 0) {
          // If there are matching pets, set the search results and total pages
          setSearchResults(filteredResults);
          setTotalPages(data.pagination.total_pages);
        } else {
          // If there are no matching pets, set the total pages to 0
          setTotalPages(0);
        }
  
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

      // Filter pets with images
      if (showOnlyPetsWithImages && (!pet.photos || pet.photos.length === 0)) {
        matchesAllFilters = false;
      }

      // If the pet matches all filters, include it in the results
      return matchesAllFilters;
    });
  };

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
          />
        ));
      } else {
        // If there are no matching pets, display a message and set total pages to 0
        setTotalPages(0);
        return <p>No pets match your criteria.</p>;
      }
    }
  };


  const generatePaginationButtons = () => {
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

  const handleShowOnlyPetsWithImages = async () => {
    // Toggle the value of showOnlyPetsWithImages
    const updatedShowOnlyPetsWithImages = !showOnlyPetsWithImages;
  
    // Apply filters to the cached data
    const filteredResults = applyFilters(searchResults, selectedFilters);
  
    // Apply the "Show only pets with images" filter
    let filteredPets = filteredResults;
  
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
