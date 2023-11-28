
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

async function fetchAnimalsByType(type, page) {
  if (type === 'dog' || type === 'cat') {
    const endpoint = `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/all_pets?type=${type}&limit=100&page=${page}`;
    const response = await fetch(endpoint);
    const dataRaw = await response.json();
    const stringData = JSON.stringify(dataRaw);
    const parsedData = JSON.parse(stringData);
    const petData = JSON.parse(parsedData.body);
    
    return petData.animals.filter((animal) => animal && animal.photos.length > 0);
  } else if (type === 'other') {
    const otherAnimalTypes = ['horse', 'bird', 'barnyard'];
    const animalData = [];

    for (const animalType of otherAnimalTypes) {
      const response = await fetch(
        `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/all_pets?type=${animalType}&limit=20&page=${page}`
      );

      if (response.ok) {
        const dataRaw = await response.json();
        const stringData = JSON.stringify(dataRaw);
        const parsedData = JSON.parse(stringData);
        const animalDataReceived = JSON.parse(parsedData.body);
        console.log(animalDataReceived, "animalData");

        animalData.push(...(animalDataReceived.animals || []));
      } else {
        console.error(`Error fetching data for ${animalType}:`, response.status, response.statusText);
      }
    }

    return animalData.filter((animal) => animal && animal.photos.length > 0);
  }

  return [];
}
function AllPets() {
  const { type } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cache, setCache] = useState([]);
  const petsPerPage = 20;
  const buttonsToShow = 9;

  const fetchPetsForCurrentPage = async (type, page) => {
    try {
      const animals = await fetchAnimalsByType(type, page);
      setCache(animals);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchPetsForCurrentPage(type, currentPage);
  }, [type, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setCurrentPage(newPage);
    }
  };

  const startPage = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
  const endPage = startPage + buttonsToShow - 1;

  const pageButtons = Array.from({ length: buttonsToShow }, (_, i) => startPage + i);

  return (
    <div className="all-pets-page">
      <h2>{`All ${type.charAt(0).toUpperCase() + type.slice(1)}s`}</h2>
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
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default AllPets;