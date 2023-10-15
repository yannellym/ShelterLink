import React, { useState, useEffect } from 'react';
import SearchFilters from './SearchFilters';
import SectionLink from './SectionLink';
import AdoptionInfoSection from './AdoptionInfoSection';
import UserPreferencesForm from './UserPreferencesForm';
import PetCard from './PetCard';
import '../styles/Home.css';
import dog2 from '../images/dog.jpg';
import kitten from '../images/kitten.jpg';
import hamster from '../images/hamster.jpg';
import paw from '../images/paw.png';
import { Link } from 'react-router-dom'; 
// // Placeholder data
// const placeholderBreeds = ['Golden Retriever', 'Labrador', 'Poodle', 'Bulldog', 'Pug'];
// const placeholderSizes = ['Small', 'Medium', 'Large'];
// const placeholderAges = ['Puppy', 'Adult', 'Senior'];
// const placeholderTypes = ['Dog', 'Cat', 'Bird', 'Rabbit'];

// const placeholderDogs = [
//   { id: 1, name: 'Buddy', breed: 'Golden Retriever', photo: 'dogs1.jpg' },
//   { id: 2, name: 'Daisy', breed: 'Labrador', photo: 'dog2.jpg' },
//   { id: 3, name: 'Charlie', breed: 'Poodle', photo: 'dog3.jpg' },
// ];

function Home({ favoritePets, addToFavorites, removeFromFavorites }) {
  const [loading, setLoading] = useState(true);
  const [petData, setPetData] = useState([]); // Store fetched pet data
  const [selectedAnimals, setSelectedAnimals] = useState([]); // Store selected animals

  useEffect(() => {
    // Function to fetch pet data from an API
    const fetchPetData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/petfinder?perPage=200');
        const data = await response.json();

        if (data && data.animals) {
          setPetData(data.animals);
          setLoading(false);

          // Select 5 animals from the fetched data
          const animals = data.animals.filter((animal) => animal.photos.length > 0).slice(0, 4);

          if (animals.length < 4) {
            // If there are fewer than 5 animals, fetch more data to reach 5
            const remainingAnimalsCount = 4 - animals.length;
            const additionalAnimals = data.animals.slice(0, remainingAnimalsCount);
            setSelectedAnimals([...animals, ...additionalAnimals]);
          } else {
            setSelectedAnimals(animals);
          }
        }
      } catch (error) {
        console.error('Error fetching pet data:', error);
        setLoading(false);
      }
    };

    fetchPetData(); // Fetch pet data when the component mounts
  }, []);


  // const handleFilterChange = (event) => {
  //   const selectedType = event.target.value; // Placeholder: Type of pet
    
  //   // Get the values from other input fields (city, state, zip code)
  //   const city = document.getElementById('cityInput').value.trim();
  //   const state = document.getElementById('stateInput').value.trim();
  //   const zipCode = document.getElementById('zipCodeInput').value.trim();
  
  //   // Simulate filtering based on type of pet and other criteria
  //   const filteredDogs = placeholderDogs.filter(dog => {
  //     const matchesType = !selectedType || dog.type === selectedType;
  
  //     if (city || state || zipCode) {
  //       const matchesCity = !city || dog.city.toLowerCase().includes(city.toLowerCase());
  //       const matchesState = !state || dog.state.toLowerCase().includes(state.toLowerCase());
  //       const matchesZipCode = !zipCode || dog.zipCode.includes(zipCode);
  //       return matchesType && (matchesCity || matchesState || matchesZipCode);
  //     }
  
  //     return matchesType;
  //   });
  
  //   setSelectedAnimals(filteredDogs);
  // };
  console.log('Number of pets received in parent component:', selectedAnimals.length);
  return (
    <div className="Home">
      <main className="main-container">
        <div className="background-image"></div>
        <div className="form-and-search-container">
          <div className="left-column">
            <UserPreferencesForm />
          </div>
          <div className="divider-container">
            <div className="divider">OR</div>
          </div>
          <div className="right-column">
            <div className="search-bar-container">
              {/* <SearchFilters
                breeds={placeholderBreeds}
                sizes={placeholderSizes}
                ages={placeholderAges}
                types={placeholderTypes}
                onFilterChange={handleFilterChange}
              /> */}
            </div>
          </div>
        </div>
        <div className="section-links-div">
          <h3> Find your fur-ever friend:</h3>
          <div className="section-links-inner-div">
            <SectionLink title="All Dogs" imageSrc={dog2} link="/all-pets/dog" />
            <SectionLink title="All Cats" imageSrc={kitten} link="/all-pets/cat" />
            <SectionLink title="Other Animals" imageSrc={hamster} link="/all-pets/other" />
            <SectionLink title="Shelters & Rescues" imageSrc={paw} link="/shelters" />
          </div>

        </div>
        <div className="resource-div">
          <h3> Resources:</h3>
          <AdoptionInfoSection />  
        </div>
        <div className="nearby-pets">
          <h3>Pets with greater need for love:</h3>
          <div className="nearby-pet-cards">
            {loading ? (
              <p>Loading...</p>
            ) : (
              selectedAnimals.map((pet) => {
                return (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}
                    isFavorite={favoritePets.some((favoritePet) => favoritePet.id === pet.id)}
                  />
              )})
            )}
            <Link to="/find-a-pet" className="greater-need-cards"> 
              <img width="64" height="64" src="https://img.icons8.com/sf-black/64/right.png" alt="right" />
              <p><strong>View all available pets near you.</strong></p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}


export default Home;