import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AllPetsPage.css';
import PetCard from '../components/PetCard';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function AllPets() {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Declare currentPage as a state variable
  const [cache, setCache] = useState([]);
  const petsPerPage = 20;
  const otherAnimalTypes = ["horse", "bird", "barnyard"];
  const buttonsToShow = 9; // Number of buttons to show at once

  const fetchAnimalsByCategory = async (category, page) => {
    let endpoint;
    let animalData;

    if (category === "dog" || category === "cat") {
      endpoint = `http://localhost:3002/api/petfinder?type=${category}&limit=${100}&page=${page}`;
    } else if (category === "other") {
      // Fetch animals for each type in the "other" category
      const animalPromises = otherAnimalTypes.map(async (animalType) => {
        const response = await fetch(
          `http://localhost:3002/api/petfinder?type=${animalType}&limit=${petsPerPage}&page=${page}`
        );
        const data = await response.json();
        return data.animals || [];
      });

      const animalResponses = await Promise.all(animalPromises);
      animalData = animalResponses.flat();
    }

    try {
      if (animalData) {
        return animalData.filter((animal) => animal && animal.photos.length > 0);
      } else if (endpoint) {
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data && data.animals) {
          return data.animals.filter((animal) => animal.photos.length > 0);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }

    return [];
  };

  const fetchPetsForCurrentPage = async (category, page) => {
    const animals = await fetchAnimalsByCategory(category, page);

    if (animals.length < petsPerPage) {
      // If there are not enough pets with photos on this page, make additional API calls
      let remainingPetsToFetch = petsPerPage - animals.length;
      let nextPage = page + 1;

      while (remainingPetsToFetch > 0) {
        const additionalAnimals = await fetchAnimalsByCategory(category, nextPage);
        animals.push(...additionalAnimals);
        nextPage++;
        remainingPetsToFetch -= additionalAnimals.length;
      }
    }

    // Shuffle the animals array
    shuffleArray(animals);

    return animals.slice(0, petsPerPage);
  };

  useEffect(() => {
    async function fetchData() {
      const animals = await fetchPetsForCurrentPage(category, currentPage);

      setCache(animals);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    fetchData();
  }, [category, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setCurrentPage(newPage);
    }
  };

  // Calculate the range of page buttons to display
  const startPage = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
  const endPage = startPage + buttonsToShow - 1;

  const pageButtons = Array.from({ length: buttonsToShow }, (_, i) => startPage + i);

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
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageButtons.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllPets;
