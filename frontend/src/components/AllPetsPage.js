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
    let endpoint;
  
    if (type === "dog" || type === "cat") {
      // Query dogs and cats
      endpoint = `http://localhost:3002/api/petfinder?type=${type}&offset=${offset}&limit=${petsPerPage}`;
    } else if (type === "other") {
      // Query "horse," "rabbit," "hamster," and "pigeon"
      const validTypes = ["horse", "rabbit", "hamster", "pigeon"].join(",");
      endpoint = `http://localhost:3002/api/petfinder?type=${validTypes}&offset=${offset}&limit=${petsPerPage}`;
    } else {
      // Query all animals
      endpoint = `http://localhost:3002/api/petfinder?offset=${offset}&limit=${petsPerPage}`;
    }
  
    try {
      // Continue with your existing code to fetch data from the modified endpoint
      const response = await fetch(endpoint);
      const data = await response.json();
  
      console.log('API Response:', data);
  
      if (data && data.animals) {
        let pets = data.animals;
  
        if (type !== "dog" && type !== "cat") {
          // Filter out dogs and cats if the type is not "dog" or "cat"
          pets = pets.filter(pet => pet.type !== 'Dog' && pet.type !== 'Cat');
        }
  
        setLoading(false);
  
        // Check if you have fewer than 20 pets and continue querying for "other" animals
        if (type === "other" && pets.length < 20) {
          const remainingPets = 20 - pets.length;
          const additionalPets = await fetchAnimalsByType("other", page + 1);
          pets = pets.concat(additionalPets.slice(0, remainingPets));
        }
  
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


// const fetchAnimalsByType = async (type) => {
//   const endpoint = `http://localhost:3002/api/petfinder?type=${type}&limit=${petsPerPage}`;

//   try {
//     const response = await fetch(endpoint);
//     const data = await response.json();

//     if (data && data.animals) {
//       return data.animals;
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//   }

//   return [];
// };

// useEffect(() => {
//   async function fetchData() {
//     const allPets = await Promise.all(
//       otherAnimalTypes.map(animalType => fetchAnimalsByType(animalType))
//     );
    
//     // Merge the arrays of animals
//     const mergedPets = allPets.reduce((accumulator, current) => [...accumulator, ...current], []);
    
//     setCache(mergedPets);
//     setLoading(false);
//   }

//   fetchData();
// }, []);