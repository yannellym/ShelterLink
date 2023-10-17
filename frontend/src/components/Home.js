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
import { Link, useNavigate } from 'react-router-dom';

function Home({ favoritePets, addToFavorites, removeFromFavorites, userPreferences }) {
const [loading, setLoading] = useState(true);
const [selectedAnimals, setSelectedAnimals] = useState([]);
const [selectedPreferences, setSelectedPreferences] = useState(null);
const [preferredAnimals, setPreferredAnimals] = useState([]);
const navigate = useNavigate();

useEffect(() => {
  // Function to fetch pet data from an API
  const fetchPetData = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/petfinder?perPage=200');
      const data = await response.json();

      if (data && data.animals) {
        setLoading(false);
        // Select 4 animals from the fetched data
        const animals = data.animals.filter((animal) => animal.photos.length > 0).slice(0, 4);

        if (animals.length < 4) {
          // If there are fewer than 4 animals, fetch more data to reach 4
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

  // Only fetch data when the component mounts
  if (selectedAnimals.length === 0) {
    fetchPetData();
  }
}, [selectedAnimals]);


// handle the submission of the userPreferencesForm 
const handlePreferencesSubmit = (preferences) => {
  console.log(preferences, "Preferences")
  // Call the API to fetch animals based on user preferences
  fetchAnimalsBasedOnPreferences(preferences);
};

// Function to fetch animals from the API based on user preferences
const fetchAnimalsBasedOnPreferences = async (preferences) => {
  try {
    let filteredAnimals = [];
    let apiCallsMade = 0;

    while (apiCallsMade < 2 && filteredAnimals.length === 0) {
      if (preferences?.type !== 'any') {
        // Include the user's selected type in the API request
        const apiUrl = `http://localhost:3002/api/petfinder?perPage=100&type=${preferences.type}&gender=${preferences.gender}&age=${preferences.age}`;
        const response = await fetch(apiUrl);
        const prefdata = await response.json();
        console.log(prefdata, "prefdata");
  
        if (prefdata && prefdata.animals) {
          filteredAnimals = prefdata.animals.filter((animal) => {
           
            // Check if any of the temperament tags match the preferences
            const matchesTags = preferences.temperament.some((prefTemperament) => animal.tags.includes(prefTemperament));
  
            return (matchesTags || preferences.temperament.length === 0);
          });
  
          console.log(filteredAnimals, "filteredanimals");
  
          if (filteredAnimals.length === 0) {
            console.log("No suitable animals found. Making another API request.");
            apiCallsMade++;
          }
        }
      }
    }

    // If no suitable animals are found in 4 API calls, display an animal based on type and gender
    if (filteredAnimals.length === 0) {
      console.log("Displaying an animal based on type and gender or size...");
      
      const type = preferences.type; 
      const gender = preferences.gender; 
    
      // Make an API request to fetch an animal based on type and matching gender or age
      const apiUrl = `http://localhost:3002/api/petfinder?perPage=1&type=${type}&gender=${gender}`;
      
      try {
        const response = await fetch(apiUrl);
        const animalData = await response.json();
        
        if (animalData && animalData.animals && animalData.animals.length > 0) {
          const matchedAnimal = animalData.animals[0];
          // Append the matched animal to the filteredAnimals array
          filteredAnimals.push(matchedAnimal);
        } else {
          console.log("No matching animal found based on type and gender or age.");
        }
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    }
    // Append the matching animals to the preferredAnimals array
    setPreferredAnimals(filteredAnimals);
  } catch (error) {
    console.error('Error fetching pet data:', error);
  }
};

const toggleForm = () => {
  window.location.reload(); 
};


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

  return (
    <div className="Home">
      <main className="main-container">
        <div className="background-image"></div>
        <div className="form-and-search-container">
          <div className="left-column">
          {preferredAnimals.length <= 0  ? (
        // Render the UserPreferencesForm when the form is visible
        <UserPreferencesForm onPreferencesSubmit={handlePreferencesSubmit} userPreferences={userPreferences} />
      ) : (
        // Render the pet card
        <div>
          <PetCard 
                key={preferredAnimals[0].id}
                pet={preferredAnimals[0]}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                isFavorite={favoritePets.some((favoritePet) => favoritePet.id === preferredAnimals[0].id)}
                className="special-card"
              />
          <button onClick={toggleForm}>Show Form</button>
        </div>
      )}
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
            <a href="https://www.chewy.com/g/animal-shelters-and-rescues" className="shelters-cards">
              <img width="64" height="64" src={paw} alt="right" />
              <p><strong>View all shelters & rescues near you.</strong></p>
            </a>
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