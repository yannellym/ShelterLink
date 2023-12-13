import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/MainPage.css';
import PetCard from '../components/PetCard';
import Filter from './Filter';

function FindApet({ favoritePets, addToFavorites, removeFromFavorites, isAuthenticated }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [totalPages, setTotalPages] = useState(0);
  const maxPaginationButtons = 9;

  const [showOnlyPetsWithImages, setShowOnlyPetsWithImages] = useState(false);

  const [latitude, setLatitude]  = useState(null);
  const [longitude, setLongitude]  = useState(null);

  const [selectedFilters, setSelectedFilters] = useState({
    location: 'any',
    type: 'any',
    breed: 'any',
    age: 'any',
    gender: 'any',
    size: 'any',
    coat: 'any',
  });

  const location = useLocation();

  useEffect(() => {
    console.log("being called")
    // Check if the location state contains pets
    if (location.state && location.state.pets) {

      setSearchResults(location.state.pets.animals);
      setTotalPages(location.state.pets.pagination.total_pages);
      setCurrentPage(location.state.pets.pagination.current_page);
      setLatitude(location.state.userLocation.latitude);
      setLongitude(location.state.userLocation.longitude);
      setLoading(false);
    } else {
      // If no pets in location state, fetch from API
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);

            fetchPetsForPage(currentPage, selectedFilters, latitude, longitude);
            setLoading(false);
          },
          (error) => {
            console.error("Error getting user's location:", error.message);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    }
  }, [currentPage, selectedFilters, showOnlyPetsWithImages, location.state]);

  const fetchPetsForPage = async (page, filters, lat, lon) => {
    try {
      let endpoint = `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/pet_zip_search?page=${page}&location=${lat},${lon}&limit=${showOnlyPetsWithImages ? 24 : itemsPerPage}&timestamp=${Date.now()}`;

      for (const filterKey in filters) {
        if (filters[filterKey] !== 'any') {
          endpoint += `&${filterKey}=${filters[filterKey]}`;
        }
      }

      // console.log('Fetching data with endpoint:', endpoint);

      const response = await fetch(endpoint);
      const rawData = await response.json();
      const data = JSON.parse(rawData.body);
      console.log("received data", data);

      if (data && data.animals) {
        console.log("setting results to", data)
        setSearchResults(data.animals);
        setCurrentPage(page);
        setTotalPages(data.pagination.total_pages);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    console.log("page clicked", page);
    setLoading(true);
  
    // Capture the current page value in a variable
    const currentPageValue = page;
  
    setTimeout(() => {
      fetchPetsForPage(currentPageValue, selectedFilters, latitude, longitude);
      window.scrollTo(0, 0);
    }, 500);
  };


  // useEffect(() => {
  //   if (latitude !== null && longitude !== null) {
  //     fetchPetsForPage(currentPage, selectedFilters, latitude, longitude);
  //   }
  // }, [currentPage, selectedFilters, showOnlyPetsWithImages, latitude, longitude]);

  // const handleFilterChange = async (newFilters) => {
  //   setSearchResults([]);
  //   setLoading(true);
  //   setSelectedFilters(newFilters);
  //   setCurrentPage(1);
  //   try {
  //     let endpoint = `https://iyank5vavf.execute-api.us-east-1.amazonaws.com/default/lambdaapi-dev?page=1&limit=${50}`;
  //     for (const filterKey in newFilters) {
  //       if (newFilters[filterKey] !== 'any') {
  //         endpoint += `&${filterKey}=${newFilters[filterKey]}`;
  //       }
  //     }

  //     const response = await fetch(endpoint);
  //     const data = await response.json();

  //     if (data && data.animals) {
  //       const filteredResults = applyFilters(data.animals, newFilters);
  //       if (filteredResults.length > 0) {
  //         setSearchResults(filteredResults);
  //         setTotalPages(data.pagination.total_pages);
  //       } else {
  //         setTotalPages(0);
  //       }
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error.message);
  //     setLoading(false);
  //   }
  // };

  // const applyFilters = (data, filters) => {
  //   return data.filter((pet) => {
  //     let matchesAllFilters = true;
  //     for (const filterKey in filters) {
  //       const filterValue = filters[filterKey]?.toLowerCase();
  //       const petValue = pet[filterKey]?.toLowerCase();

  //       if (filterValue === 'any') {
  //         continue;
  //       }

  //       if (filterKey === 'type') {
  //         if (filterValue === 'cat' && petValue !== 'cat') {
  //           matchesAllFilters = false;
  //           break;
  //         }
  //         if (filterValue === 'dog' && petValue !== 'dog') {
  //           matchesAllFilters = false;
  //           break;
  //         }
  //       } else if (filterKey === 'breed') {
  //         if (
  //           filterValue !== 'any' &&
  //           petValue &&
  //           !(
  //             petValue.primary.toLowerCase().includes(filterValue) ||
  //             (petValue.secondary && petValue.secondary.toLowerCase().includes(filterValue))
  //           )
  //         ) {
  //           matchesAllFilters = false;
  //           break;
  //         }
  //       } else if (filterKey === 'location') {
  //         const petState = pet.contact?.address?.state?.toLowerCase();
  //         if (petState !== filterValue) {
  //           matchesAllFilters = false;
  //           break;
  //         }
  //       } else {
  //         if (petValue !== filterValue) {
  //           matchesAllFilters = false;
  //           break;
  //         }
  //       }
  //     }

  //     if (showOnlyPetsWithImages && (!pet.photos || pet.photos.length === 0)) {
  //       matchesAllFilters = false;
  //     }

  //     return matchesAllFilters;
  //   });
  // };

  const renderPetCards = () => {
    if (loading) {
      console.log("here")
      return <p>Looking through all of our amazing pets...</p>;
    } else if (searchResults.length > 0) {
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
      setTotalPages(0);
      return <p>No pets match your criteria.</p>;
    }
  };

  const generatePaginationButtons = () => {
    if (totalPages > 1) {
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

  // const handleShowOnlyPetsWithImages = async () => {
  //   const updatedShowOnlyPetsWithImages = !showOnlyPetsWithImages;
  //   const filteredResults = applyFilters(searchResults, selectedFilters);
  //   let filteredPets = filteredResults;
  //   if (updatedShowOnlyPetsWithImages) {
  //     filteredPets = filteredResults.filter((pet) => pet.photos && pet.photos.length > 0);
  //   }
  //   setShowOnlyPetsWithImages(updatedShowOnlyPetsWithImages);
  //   setSearchResults(filteredPets);
  //   setCurrentPage(1);
  // };

  return (
    <div className="main-page">
      <div className="sidebar">
        <div className="filters">
          {/* { <Filter onFilterChange={handleFilterChange} /> } */}
        </div>
      </div>
      <div className="content">
        <div className="filter-pets">
          {/* <label>
            <input
              type="checkbox"
              checked={showOnlyPetsWithImages}
              onChange={handleShowOnlyPetsWithImages}
            />
            Show only pets with images
          </label> */}
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
