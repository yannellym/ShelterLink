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
  const [cache, setCache] = useState([]);
  const petsPerPage = 100;
  const otherAnimalTypes = ["horse", "bird", "barnyard"];
  
  const fetchAnimalsByCategory = async (category) => {
    let endpoint;

    if (category === "dog" || category === "cat") {
      // First API call for "dog" or "cat"
      endpoint = `http://localhost:3002/api/petfinder?type=${category}&limit=${petsPerPage}`;
    } else if (category === "other") {
      // Second API call for "other" category
      // Fetch animals for each type in the "other" category
      const animalPromises = otherAnimalTypes.map(animalType => {
        return fetch(`http://localhost:3002/api/petfinder?type=${animalType}&limit=${petsPerPage}`)
          .then(response => response.json());
      });

      const animalData = await Promise.all(animalPromises);

      // Merge the arrays of animals from different types
      const mergedAnimals = animalData.flatMap(data => data.animals);

      endpoint = mergedAnimals;
    }

    try {
      if (endpoint) {
        if (Array.isArray(endpoint)) {
          // If endpoint is an array, we have already fetched animals for the "other" category
          return endpoint.filter(animal => animal && animal.photos.length > 0);
        } else {
          // Fetch animals for "dog" or "cat"
          const response = await fetch(endpoint);
          const data = await response.json();
          if (data && data.animals) {
            return data.animals.filter((animal) => animal.photos.length > 0);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
    
    return [];
  };

  useEffect(() => {
    async function fetchData() {
      const animals = await fetchAnimalsByCategory(category);

      // Shuffle the animals array
      shuffleArray(animals);
      
      setCache(animals);
      setLoading(false);
    }

    fetchData();
  }, [category]);

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
