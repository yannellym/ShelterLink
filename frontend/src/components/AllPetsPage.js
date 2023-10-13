import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AllPetsPage.css';
import PetCard from './PetCard';

function AllPetsPage() {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 40;
  const [cache, setCache] = useState([]);

  const fetchAnimalsByType = async (type, page) => {
    const offset = (page - 1) * petsPerPage;

    try {
      const response = await fetch(
        `http://localhost:3002/api/petfinder?type=${type}&offset=${offset}&limit=${petsPerPage}`
      );
      const data = await response.json();

      console.log('API Response:', data);

      if (data && data.animals) {
        const pets = data.animals;

        setLoading(false);

        // Set the pet data in the state
        setCache(pets);

        return pets;
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await fetchAnimalsByType(category, currentPage);
    }

    fetchData();
  }, [category, currentPage]);

  return (
    <div className="all-pets-page">
      <h2>{`All ${category.charAt(0).toUpperCase() + category.slice(1)}s`}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pet-list">
          {cache.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllPetsPage;
