import React, { useState } from 'react';
import SearchFilters from './SearchFilters';
import SectionLink from './SectionLink';
import NearbyPetCard from './NearbyPetCard';
import AllNearbyPetsCard from './AllNearbyPetsCard';
import AdoptionInfoSection from './AdoptionInfoSection';
import UserPreferencesForm from './UserPreferencesForm';
import '../styles/Home.css';

// Placeholder data
const placeholderBreeds = ['Golden Retriever', 'Labrador', 'Poodle', 'Bulldog', 'Pug'];
const placeholderSizes = ['Small', 'Medium', 'Large'];
const placeholderAges = ['Puppy', 'Adult', 'Senior'];
const placeholderTypes = ['Dog', 'Cat', 'Bird', 'Rabbit'];
const dog2 = '/images/dog.jpg';

const placeholderDogs = [
  { id: 1, name: 'Buddy', breed: 'Golden Retriever', photo: 'dogs1.jpg' },
  { id: 2, name: 'Daisy', breed: 'Labrador', photo: 'dog2.jpg' },
  { id: 3, name: 'Charlie', breed: 'Poodle', photo: 'dog3.jpg' },
];

function Home() {
  const [filteredDogs, setFilteredDogs] = useState(placeholderDogs);

  const handleFilterChange = (event) => {
    const selectedType = event.target.value; // Placeholder: Type of pet
    
    // Get the values from other input fields (city, state, zip code)
    const city = document.getElementById('cityInput').value.trim();
    const state = document.getElementById('stateInput').value.trim();
    const zipCode = document.getElementById('zipCodeInput').value.trim();
  
    // Simulate filtering based on type of pet and other criteria
    const filteredDogs = placeholderDogs.filter(dog => {
      const matchesType = !selectedType || dog.type === selectedType;
  
      if (city || state || zipCode) {
        const matchesCity = !city || dog.city.toLowerCase().includes(city.toLowerCase());
        const matchesState = !state || dog.state.toLowerCase().includes(state.toLowerCase());
        const matchesZipCode = !zipCode || dog.zipCode.includes(zipCode);
        return matchesType && (matchesCity || matchesState || matchesZipCode);
      }
  
      return matchesType;
    });
  
    setFilteredDogs(filteredDogs);
  };
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
              <SearchFilters
                breeds={placeholderBreeds}
                sizes={placeholderSizes}
                ages={placeholderAges}
                types={placeholderTypes}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
        <div className="section-links-div">
          <h3> Find your fur-ever friend:</h3>
          <div className="section-links-inner-div">
            <SectionLink title="All Dogs" imageSrc= {dog2} link="/dogs" />
            <SectionLink title="All Cats" imageSrc= {dog2} link="/cats" />
            <SectionLink title="Other Animals" imageSrc= {dog2} link="/other-animals" />
            <SectionLink title="Shelters & Rescues" imageSrc= {dog2} link="/shelters" />
          </div>
        </div>

        <div className="adoption-div">
          <h3> Resources:</h3>
          <AdoptionInfoSection />  
          {/* <DogList dogs={filteredDogs} /> */}
        </div>

        <div className="nearby-pets">
          <h3>Pets with greater need for love:</h3>
          <div className="nearby-pet-cards">
            <NearbyPetCard imageSrc={dog2} name="Buddy" />
            <NearbyPetCard imageSrc={dog2} name="Whiskers" />
            <NearbyPetCard imageSrc={dog2} name="Roger" />
            <NearbyPetCard imageSrc={dog2} name="Daisy" />
            <AllNearbyPetsCard imageSrc={dog2} />
          </div>
        </div>
      </main>
    </div>
  );
}


export default Home;