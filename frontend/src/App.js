import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import DogList from './components/DogList';
import SectionLink from './components/SectionLink'; 
import NearbyPetCard from './components/NearbyPetCard';
import AllNearbyPetsCard from './components/AllNearbyPetsCard';
import AdoptionInfoSection from './components/AdoptionInfoSection';
import Footer from './components/Footer';


// Placeholder data
const placeholderBreeds = ['Golden Retriever', 'Labrador', 'Poodle', 'Bulldog', 'Pug'];
const placeholderSizes = ['Small', 'Medium', 'Large'];
const placeholderAges = ['Puppy', 'Adult', 'Senior'];
const placeholderTypes = ['Dog', 'Cat', 'Bird', 'Rabbit'];


const placeholderDogs = [
  { id: 1, name: 'Buddy', breed: 'Golden Retriever', photo: 'dog1.jpg' },
  { id: 2, name: 'Daisy', breed: 'Labrador', photo: 'dog2.jpg' },
  { id: 3, name: 'Charlie', breed: 'Poodle', photo: 'dog3.jpg' },
];

function App() {
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
    <div className="App">
      <Header />
      <main>
        <div className="background-image"></div>
        <div className="search-bar-container">
          <SearchFilters breeds={placeholderBreeds} sizes={placeholderSizes} ages={placeholderAges} types={placeholderTypes} onFilterChange={handleFilterChange} />
        </div>
        <div className="section-links">
          <SectionLink title="All Dogs" link="/dogs" />
          <SectionLink title="All Cats" link="/cats" />
          <SectionLink title="Other Animals" link="/other-animals" />
          <SectionLink title="Shelters & Rescues" link="/shelters" />
        </div>

        <div className="nearby-pets">
          <NearbyPetCard imageSrc="dog1.jpg" name="Buddy" />
          <NearbyPetCard imageSrc="cat1.jpg" name="Whiskers" />
          <NearbyPetCard imageSrc="other1.jpg" name="Roger" />
          <NearbyPetCard imageSrc="dog2.jpg" name="Daisy" />
          <AllNearbyPetsCard />
        </div>

        <AdoptionInfoSection />

        <DogList dogs={filteredDogs} />

        {/* Add the Footer */}
        <Footer />
      </main>
    </div>
  );
}


export default App;
