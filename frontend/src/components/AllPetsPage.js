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
    let endpoint = `http://localhost:3002/api/petfinder?type=${type}&offset=${offset}&limit=${petsPerPage}`;
  
    // Check if the type is "other animals"
    if (type === "other animals") {
      // Modify the endpoint to fetch animals that are not dogs or cats
      // Here, you can use the Petfinder API's Get Animal Types to retrieve the list of valid types
      // You can then specify a type that is not "dog" or "cat"
      // For example, if "Rabbit" is a valid type, you can use that
      endpoint = `http://localhost:3002/api/petfinder?type=${type}&offset=${offset}&limit=${petsPerPage}`;
    }
  
    try {
      // Continue with your existing code to fetch data from the modified endpoint
      const response = await fetch(endpoint);
      const data = await response.json();
  
      console.log('API Response:', data);
  
      if (data && data.animals) {
        const pets = data.animals;
        setLoading(false);
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
