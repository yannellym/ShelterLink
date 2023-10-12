import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AllPetsPage.css';
import PetCard from './PetCard';

function AllPetsPage() {
  const { category } = useParams();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to calculate and set card heights dynamically
  const adjustCardHeights = () => {
    const petCards = document.querySelectorAll('.pet-card'); // Select all pet cards
    petCards.forEach((card) => {
      const content = card.querySelector('.pet-card-content');
      if (content) {
        card.style.height = content.offsetHeight + 'px'; // Set card height to content height
      }
    });
  };
  

  const fetchAnimalsByType = async (type) => {
    try {
      const response = await fetch(`http://localhost:3002/api/petfinder?type=${type}`);
      const data = await response.json();

      console.log('API Response:', data);

      if (data && data.animals) {
        setPets(data.animals);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimalsByType(category);
  }, [category]);
  
  
  // Call the function to adjust card heights when pets data changes (after loading)
  useEffect(() => {
    if (!loading) {
      adjustCardHeights();
    }
  }, [loading, pets]);

  console.log('Number of pets:', pets.length);

  return (
    <div className="all-pets-page">
      <h2>{`All ${category.charAt(0).toUpperCase() + category.slice(1)}s`}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pet-list">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllPetsPage;
