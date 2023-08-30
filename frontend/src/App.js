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
import Dog1 from '../src/images/dog.jpg'
import UserPreferencesForm from './components/UserPreferencesForm';


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
              <SearchFilters breeds={placeholderBreeds} sizes={placeholderSizes} ages={placeholderAges} types={placeholderTypes} onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
        <div className="section-links-div">
          <h3> Find your fur-ever friend:</h3>
          <div className="section-links-inner-div">
            <SectionLink title="All Dogs" imageSrc= {Dog1} link="/dogs" />
            <SectionLink title="All Cats" imageSrc= {Dog1} link="/cats" />
            <SectionLink title="Other Animals" imageSrc= {Dog1} link="/other-animals" />
            <SectionLink title="Shelters & Rescues" imageSrc= {Dog1} link="/shelters" />
          </div>
        </div>

        <div className="adoption-div">
          <AdoptionInfoSection />
          {/* <DogList dogs={filteredDogs} /> */}
        </div>

        <div className="nearby-pets">
          <h3>Pets with greater need for love:</h3>
          <div className="nearby-pet-cards">
            <NearbyPetCard imageSrc={Dog1} name="Buddy" />
            <NearbyPetCard imageSrc={Dog1} name="Whiskers" />
            <NearbyPetCard imageSrc={Dog1} name="Roger" />
            <NearbyPetCard imageSrc={Dog1} name="Daisy" />
            <AllNearbyPetsCard imageSrc={Dog1} />
          </div>
        </div>
      </main>
    <Footer />
    </div>
  );
}


export default App;
