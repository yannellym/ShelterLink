import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import ResourcesSection from './ResourcesSection';
import UserPreferencesForm from '../components/UserPreferencesForm';
import PetCard from '../components/PetCard';
import '../styles/Home.css';
import dog2 from '../images/dog.jpg';
import kitten from '../images/kitten.jpg';
import hamster from '../images/hamster.jpg';
import paw from '../images/paw.png';
import usePetFinderAPI from '../hooks/usePetFinderAPI'; // hook
import useAnimalsBasedOnPreferencesAPI from '../hooks/useAnimalsBasedOnPreferencesAPI'; // hook
import { Link } from 'react-router-dom';

function Home({ favoritePets, addToFavorites, removeFromFavorites, userPreferences, isAuthenticated }) {
  const [loading, setLoading] = useState(true);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [selectedPetIndex, setSelectedPetIndex] = useState(0); // Track the currently displayed pet
  const navigate = useNavigate();

   //https://3lkwhpdzchpv4fsguwdcequbom0gjlbh.lambda-url.us-east-1.on.aws/get_others?type=cat
  const { data: petData } = usePetFinderAPI(
    'https://2hghsit103.execute-api.us-east-1.amazonaws.com/default', []
  );

  // console.log(petData?.body, "DATA FROM API")

  useEffect(() => {
    if (petData && petData.body) {
      const responseBody = JSON.parse(petData.body);
  
      if (responseBody.animals) {
        setLoading(false);
        const animals = responseBody.animals.filter((animal) => animal.photos.length > 0).slice(0, 4);
  
        if (animals.length < 4) {
          const remainingAnimalsCount = 4 - animals.length;
          const additionalAnimals = responseBody.animals.slice(0, remainingAnimalsCount);
          setSelectedAnimals([...animals, ...additionalAnimals]);
        } else {
          setSelectedAnimals(animals);
        }
      }
    }
  }, [petData]);



  const { preferredAnimals, fetchAnimalsBasedOnPreferences } = useAnimalsBasedOnPreferencesAPI();

  const handlePreferencesSubmit = (preferences) => {
    fetchAnimalsBasedOnPreferences(preferences);
  }

  const fetchNewPet = () => {
    // Update the selected pet index to cycle through the available pets
    setSelectedPetIndex((prevIndex) => (prevIndex + 1) % preferredAnimals.length);
  };

  const backToForm = () => {
    // reload the page so we see the form again
    window.location.reload();
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        console.log('User Location:', userLocation);
      },
      (error) => {
        console.error('Error getting user location:', error.message);
        setLoading(false);
      }
    );
  }, []);

  const handleViewAllPetsNearYou = () => {
    // Get the user's location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
  
          // Navigate to /find-a-pet with user's location in the state
          navigate('/find-a-pet', { state: { userLocation } });
        },
        (error) => {
          console.error('Error getting user location:', error.message);
          // Handle error, maybe show a message to the user
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
      // Handle lack of geolocation support, maybe show a message to the user
    }
  };
  

  return (
    <div className="Home">
      <main className="main-container">
        <div className="background-image"></div>
        <div className="form-and-search-container">
          <div className="left-column">
            {preferredAnimals.length <= 0 ? (
              // if we DO NOT have pets in the preferredAnimals array, display the form.
              <UserPreferencesForm onPreferencesSubmit={handlePreferencesSubmit} userPreferences={userPreferences} />
            ) : (
              // if we have pets in the preferredAnimals array, display their information using the petCard component
              <div>
                <PetCard
                  key={preferredAnimals[selectedPetIndex].id}
                  pet={preferredAnimals[selectedPetIndex]}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  isFavorite={favoritePets.some((favoritePet) => favoritePet.id === preferredAnimals[selectedPetIndex].id)}
                  isAuthenticated={isAuthenticated}
                  className="matched-pet-card"
                />
                {selectedPetIndex +1 < preferredAnimals.length? 
                  (
                    <button className="fetch-new-pet" onClick={fetchNewPet}>Find another match</button>
                  )
                  : 
                  (
                  <div>
                    <h2>No more matches  </h2> 
                    <button className="back-to-form" onClick={backToForm}>Back to form</button>
                  </div>
                  )
                }
              </div>
            )}
          </div>
          <div className="divider-container">
            <div className="divider">OR</div>
          </div>
          <div className="right-column">
            <div className="search-bar-container">
              <SearchBar
                breeds={''}
                sizes={''}
                ages={''}
                types={''}
                onFilterChange={''}
              />
            </div>
          </div>
        </div>
        <div className="section-links-div">
          <h3> Find your fur-ever friend:</h3>
          <div className="section-links-inner-div">
            <Link to="/get_all_pets/dog">All Dogs</Link>
            <CategoryCard title="All Cats" imageSrc={kitten} link="/get_all_pets/type=cat" />
            <CategoryCard title="Other Animals" imageSrc={hamster} link="/get_all_pets/type=other" />
            <a href="https://www.chewy.com/g/animal-shelters-and-rescues" className="shelters-cards">
              <img width="64" height="64" src={paw} alt="right" />
              <p><strong>View all shelters & rescues near you.</strong></p>
            </a>
          </div>
        </div>
        <div className="resource-div">
          <h3> Resources:</h3>
          <ResourcesSection />
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
                    isAuthenticated={isAuthenticated}
                  />
                )
                }))}
             <button onClick={handleViewAllPetsNearYou} className="greater-need-cards">
              <img width="64" height="64" src="https://img.icons8.com/sf-black/64/right.png" alt="right" />
              <p><strong>View all available pets near you.</strong></p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
