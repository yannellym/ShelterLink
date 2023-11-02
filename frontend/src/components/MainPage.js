import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import PetCard from './PetCard';
import Filter from './Filter';

function MainPage({ favoritePets, addToFavorites, removeFromFavorites }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [cachedData, setCachedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const maxPaginationButtons = 10; // Adjust this number

  const [selectedFilters, setSelectedFilters] = useState({
    type: 'any',
    breed: 'any',
    age: 'any',
    gender: 'any',
    size: 'any',
    coat: 'any',
  });

  const fetchPetsForPage = async (page) => {
    try {
      const endpoint = `http://localhost:3002/api/petfinder?page=${page}&perPage=${itemsPerPage}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      console.log('API Response:', data);

      if (data && data.animals) {
        setCachedData(data.animals);
        setSearchResults(data.animals);
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
    fetchPetsForPage(currentPage);
  }, []);

  const handlePageChange = (page) => {
    fetchPetsForPage(page);
  };

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
    const filteredResults = applyFilters(cachedData, newFilters);
    setSearchResults(filteredResults);
  };

  const applyFilters = (data, filters) => {
    return data.filter((pet) => {
      let matchesAllFilters = true;
      for (const filterKey in filters) {
        const filterValue = filters[filterKey]?.toLowerCase();
        const petValue = pet[filterKey]?.toLowerCase();
        if (filterValue === 'any') {
          continue;
        }
        if (filterKey === 'type') {
          if (filterValue === 'cat' && petValue !== 'cat') {
            matchesAllFilters = false;
            break;
          }
          if (filterValue === 'dog' && petValue !== 'dog') {
            matchesAllFilters = false;
            break;
          }
        } else if (filterKey === 'breed') {
          const primaryBreed = pet.breeds?.primary?.toLowerCase();
          if (primaryBreed !== filterValue) {
            matchesAllFilters = false;
            break;
          }
        } else {
          if (petValue !== filterValue) {
            matchesAllFilters = false;
            break;
          }
        }
      }
      return matchesAllFilters;
    });
  };

  const renderPetCards = () => {
    if (!loading) {
      const filteredResults = applyFilters(cachedData, selectedFilters);
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
        return <p>No pets match your criteria.</p>;
      }
    } else {
      return <p>Loading...</p>;
    }
  };

  const generatePaginationButtons = () => {
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
