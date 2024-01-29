import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AllPetsPage.css';
import PetCard from '../components/PetCard';


/* function to fetch animals by type
parameters: type: String, page: Int
returns: array of animals according to given type
*/
async function fetchAnimalsByType(type, page) {
  // if the type is dog or cat, fetch from the given endpoint
  if (type === 'dog' || type === 'cat') {
    const endpoint = `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/all_pets?type=${type}&limit=30&page=${page}`;
    const response = await fetch(endpoint);
    // response is a json string
    const dataRaw = await response.json();
    const stringData = JSON.stringify(dataRaw);
    // parse the string data
    const parsedData = JSON.parse(stringData);
    const petData = JSON.parse(parsedData.body);
    return petData.animals
    // if the type equals other, let's search for other animal types
  } else if (type === 'other') {
    const otherAnimalTypes = ['horse', 'bird', 'barnyard'];
    const animalData = [];
    // fetch data for each animal type in otherAnimalTypes
    for (const animalType of otherAnimalTypes) {
      const response = await fetch(
        `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/all_pets?type=${animalType}&limit=30&page=${page}`
      );

      if (response.ok) {
        const dataRaw = await response.json();
        // response is a json string
        const stringData = JSON.stringify(dataRaw);
        // parse the json string
        const parsedData = JSON.parse(stringData);
        const animalDataReceived = JSON.parse(parsedData.body);
        console.log(animalDataReceived, "animalData");
        // save all of the animals in animalData
        animalData.push(...(animalDataReceived.animals || []));
      } else {
        console.error(`Error fetching data for ${animalType}:`, response.status, response.statusText);
      }
    }
    // return the animals after filtering for animals that have at least 1 photo
    return animalData
  }
  // if no animals matched the type, return an empty array
  return [];
}

function AllPets() {
  const { type } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cache, setCache] = useState([]);
  const buttonsToShow = 9;
  
  /* function to fetch animals for the current page. Calls fetchAnimalsByType and adds to cache.
  parameters: type: String, page: Int
  returns: array of animals according to given type
  */
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
  
  // Pagination
  const startPage = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
  // const endPage = startPage + buttonsToShow - 1;

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
      <div className="pagination-container">
        {pageButtons.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
        };

export default AllPets;