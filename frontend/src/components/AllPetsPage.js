import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AllPetsPage.css';
import PetCard from './PetCard';

function AllPetsPage() {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 20;
  const cache = []; // Cache to store pets data

  const fetchAnimalsByType = async (type, page) => {
    const offset = (page - 1) * petsPerPage;
    if (cache.length > offset) {
      // If data for this page exists in the cache, use it
      const displayedPets = cache.slice(offset, offset + petsPerPage);
      setLoading(false);
      return displayedPets;
    } else {
      try {
        const response = await fetch(
          `http://localhost:3002/api/petfinder?type=${type}&offset=${offset}&limit=${petsPerPage}`
        );
        const data = await response.json();

        console.log('API Response:', data);

        if (data && data.animals) {
          const pets = data.animals;

          // Update the cache with the fetched data
          cache.splice(offset, petsPerPage, ...pets);

          setLoading(false);
          return pets;
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAnimalsByType(category, currentPage).then((displayedPets) => {
      if (displayedPets) {
        setAllPets(displayedPets);
      }
    });
  }, [category, currentPage]);

  const [allPets, setAllPets] = useState([]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPets = cache.length; // Total pets in cache

  const totalPages = Math.ceil(totalPets / petsPerPage);

  const paginationNumbers = Array.from({ length: Math.max(9, totalPages) }, (_, index) => (
    <button key={index + 1} onClick={() => paginate(index + 1)}>
      {index + 1}
    </button>
  ));

  return (
    <div className="all-pets-page">
      <h2>{`All ${category.charAt(0).toUpperCase() + category.slice(1)}s`}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="pet-list">
            {allPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
          <div className="pagination">
            {paginationNumbers}
          </div>
        </>
      )}
    </div>
  );
}

export default AllPetsPage;
