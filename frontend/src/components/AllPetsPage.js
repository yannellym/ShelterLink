import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AllPetsPage.css';
import PetCard from './PetCard';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function AllPetsPage() {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 40;
  const [cache, setCache] = useState([]);
  const otherAnimalTypes = ["horse", "bird", "barnyard"];
  
  const fetchAnimalsByType = async (type) => {
    const endpoint = `http://localhost:3002/api/petfinder?type=${type}&limit=${petsPerPage}`;
    
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
    
      if (data && data.animals) {
        data.animals = data.animals.filter((animal) => animal.photos.length > 0);
        return data.animals;
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
    
    return [];
  };

  useEffect(() => {
    async function fetchData() {
      const allPets = await Promise.all(
        otherAnimalTypes.map(animalType => fetchAnimalsByType(animalType))
      );
      
      // Merge the arrays of animals
      const mergedPets = allPets.reduce((accumulator, current) => [...accumulator, ...current], []);

      // Shuffle the mergedPets array
      shuffleArray(mergedPets);
      
      setCache(mergedPets);
      setLoading(false);
    }

    fetchData();
  }, []);

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
