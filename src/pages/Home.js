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

/* component shows UserPreferencesForm, petCards, categoryCards, and resources section
  parameters: favoritePets: array, addToFavorites: array,  userPreferences: array, removeFromFavorites:array, isAuthenticated: string
  returns: 
*/
function Home({ favoritePets, addToFavorites, removeFromFavorites, userPreferences, isAuthenticated }) {
  const [loading, setLoading] = useState(true);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [selectedPetIndex, setSelectedPetIndex] = useState(0); // Track the currently displayed pet
  const [userLocation, setUserLocation] = useState(null); // Initialize with null or a default value
  const navigate = useNavigate();

  // fetches animals without any filters
  const { data: petData } = usePetFinderAPI(
    'https://2hghsit103.execute-api.us-east-1.amazonaws.com/default', []
  );

  const { preferredAnimals, fetchAnimalsBasedOnPreferences } = useAnimalsBasedOnPreferencesAPI();
  // once the user selects a filter, call fetchAnimalsBasedOnPreferences to use the user's preferences
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
    // if we received data
    if (petData && petData.body) {
      // parse the json string
      const responseBody = JSON.parse(petData.body);
      if (responseBody.animals) {
        setLoading(false);
        // filter for only animals that have more than one photo and save these 4 pets.
        const animals = responseBody.animals.filter((animal) => animal.photos.length > 1).slice(0, 4);
        // if the animal's array is less than 4, lets keeps trying to get more animals until we have 4 total
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
  
  useEffect(() => {
    // get the location of the user
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(userLocation); // Update the userLocation state
        console.log('User Location:', userLocation);
      },
      (error) => {
        console.error('Error getting user location:', error.message);
        setLoading(false);
      }
    );
  }, []);

  /* function that fetches animals based on user's selected location
  parameters: 
  returns: 
  */
  const handleViewAllPetsNearYou = () => {
    // Get the user's location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const userLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            // Construct the URL with the latitude and longitude parameters
            const apiUrl = `https://2hghsit103.execute-api.us-east-1.amazonaws.com/default/pet_zip_search?location=${userLocation.latitude},${userLocation.longitude}`;
            // Make a fetch request to the new API endpoint
            const response = await fetch(apiUrl);
            // Check if the request was successful (status code 2xx)
            if (response.ok) {
              // Parse the response body as JSON
              const prefData= await response.json();
              let parsedBody;
              try {
                parsedBody = JSON.parse(prefData.body);
              } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                return; // Stop execution if parsing fails
              }
              console.log('Response Data:', parsedBody);
              // take user to find-a-pet page to render the results
              navigate('/find-a-pet', { state: { userLocation } } );
            } else {
              // Handle error response (status code other than 2xx)
              console.error('Error:', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error.message);
            // Handle other errors, maybe show a message to the user
          }
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
  };;
  
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
            <CategoryCard title="All Dogs" imageSrc={dog2} link="/all_pets/dog" />
            <CategoryCard title="All Cats" imageSrc={kitten} link="/all_pets/cat" />
            <CategoryCard title="Other Animals" imageSrc={hamster} link="/all_pets/other" />
            <CategoryCard
              title="Shelters nearby"
              imageSrc={paw}
              link={`/nearby_shelters?latitude=${userLocation?.latitude}&longitude=${userLocation?.longitude}`}
            />
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
