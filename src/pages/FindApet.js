import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/MainPage.css';
import PetCard from '../components/PetCard';
import Filter from './Filter';

function FindApet({ userLocation, favoritePets, addToFavorites, removeFromFavorites, isAuthenticated }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 27;
  const [totalPages, setTotalPages] = useState(0);
  const maxPaginationButtons = 9;

  const [selectedFilters, setSelectedFilters] = useState({
    location: 'any',
    type: 'any',
    breed: 'any',
    age: 'any',
    gender: 'any',
    size: 'any',
    coat: 'any',
  });


  // Function to fetch pets for a specific page
  const fetchPetsForPage = async (page, filters) => {
    console.log(filters, "filter selc");
    console.log("fetching");
    try {
      let endpoint = `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/pet_filter?page=${page}&limit=${itemsPerPage}`;

      // Add filter parameters to the API request
      for (const filterKey in filters) {
        if (filters[filterKey] !== 'any') {
          endpoint += `&${filterKey}=${filters[filterKey]}`;
        }
      }
      console.log(endpoint);
      const response = await fetch(endpoint);
      const responseData = await response.json(); // Parse the outer JSON string
      const data = JSON.parse(responseData.body); // Parse the inner JSON string

      console.log(data);
      if (data && data.animals.length > 0) {
        setSearchResults(data.animals); // new filtered data
        // remove the loading indicator
        setLoading(false);
        setCurrentPage(page);
        setTotalPages(data.pagination.total_pages);
      } else {
        // If there are no pets matching the criteria
        setSearchResults([]);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch pets for the initial page when the component mounts
    fetchPetsForPage(currentPage, selectedFilters, userLocation?.zipCode || 11208);
  }, [selectedFilters, userLocation, currentPage]);

  const handleFilterChange = async (newFilters) => {
    setSearchResults([]);
    setLoading(true);
    setSelectedFilters(newFilters);
    setCurrentPage(1);
    }
  

  const handlePageChange = (page) => {
    // Set loading to true before changing the page
    setLoading(true);
    // Delay fetching data and scrolling to the top
    setTimeout(() => {
      fetchPetsForPage(page, selectedFilters, userLocation.zipCode || 11208);

      // After the data is loaded, scroll to the top
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, 500); // 500 milliseconds (0.5 second) delay
  };

  const renderPetCards = () => {
    if (loading) {
      console.log(searchResults, "search res")
      return <p>Looking through all of our amazing pets...</p>;
    } else {
      if (searchResults?.length > 0) {
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
        return (
          <div>
            <p>No pets match your criteria.</p>
          </div>
        );
      }
    } 
  };

  const generatePaginationButtons = () => {
    if (totalPages > 1 && searchResults.length > 0) {
      const buttons = [];
      const startPage = Math.max(1, currentPage - Math.floor(maxPaginationButtons / 2));
      const endPage = Math.min(totalPages, startPage + maxPaginationButtons - 1);
  
      for (let page = startPage; page <= endPage; page++) {
        buttons.push(
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        );
      }
      return buttons;
    } else {
      return null;
    }
  };

  return (
    <div className="main-page">
      <div className="sidebar">
        <div className="filters">
          { <Filter onFilterChange={handleFilterChange} /> }
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

export default FindApet;
