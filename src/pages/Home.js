import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import NoLocationCard from '../components/NoLocationCard'; 
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
import useUserLocation from '../hooks/useUserLocation'; 

/* component shows UserPreferencesForm, petCards, categoryCards, and resources section
  parameters: favoritePets: array, addToFavorites: array,  userPreferences: array, removeFromFavorites:array, isAuthenticated: string
  returns: 
*/
function Home({ favoritePets, addToFavorites, removeFromFavorites, userPreferences, isAuthenticated }) {
  const [loading, setLoading] = useState(true);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [selectedPetIndex, setSelectedPetIndex] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();
  
  const { data: petData } = usePetFinderAPI(
    'https://2hghsit103.execute-api.us-east-1.amazonaws.com/default', []
  );

  const { preferredAnimals, fetchAnimalsBasedOnPreferences } = useAnimalsBasedOnPreferencesAPI();
  const { userLocation: fetchedUserLocation, loading: locationLoading, error: locationError, ready } = useUserLocation();
  console.log("userlocation1:", fetchedUserLocation);

  const handlePreferencesSubmit = (preferences) => {
    fetchAnimalsBasedOnPreferences(preferences);
  };

  const fetchNewPet = () => {
    setSelectedPetIndex((prevIndex) => (prevIndex + 1) % preferredAnimals.length);
  };

  const backToForm = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (locationLoading) {
      setLoading(true);
    } else if (locationError) {
      console.error('Error getting user location:', locationError.message);
      setLoading(false);
    } else if (fetchedUserLocation && ready) {
      setLoading(false);
      setUserLocation(fetchedUserLocation);

      // Extract ZIP code from the userLocation response
      const { zipCode } = fetchedUserLocation;
      console.log('ZIP Code:', zipCode);

      // Directly call the handleViewAllPetsNearYou function with the ZIP code
      handleViewAllPetsNearYou();
    }
  }, [fetchedUserLocation, locationLoading, locationError, ready]);

  useEffect(() => {
    if (petData && petData.body) {
      const responseBody = JSON.parse(petData.body);
      if (responseBody.animals) {
        setLoading(false);
        const animals = responseBody.animals.filter((animal) => animal.photos.length > 1).slice(0, 4);
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

  /* function that fetches animals based on user's selected location
  parameters: 
  returns: 
  */
  const handleViewAllPetsNearYou = (e) => {
    console.log(fetchedUserLocation, "loc with zip")
    try {
      if (fetchedUserLocation) {
        // If userLocation is available, directly navigate to the nearby_pets page
        console.log("sending", fetchedUserLocation)
        navigate('/nearby_pets', { state: { fetchedUserLocation } });
      } else if (navigator.geolocation) {
        // If geolocation is supported, attempt to get the user's current position
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userLocation = {
              latitude,
              longitude,
            };
            navigate('/nearby_pets', { state: { userLocation } });
          },
          (error) => {
            console.error('Error getting user location:', error.message);
            // If there's an error or user denies location access, prompt them to enter their ZIP code
            handleZipCodeInput();
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.error('Geolocation is not supported by your browser');
        // If there is no geolocation support, prompt the user to enter their ZIP code
        handleZipCodeInput();
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

const handleZipCodeInput = () => {
  // Prompt the user to enter their ZIP code
  const userEnteredZipCode = prompt('Please enter your ZIP code:');
  if (userEnteredZipCode) {
    const fetchedUserLocation = {
      zipCode: userEnteredZipCode,
    };
    navigate('/nearby_pets', { state: { fetchedUserLocation} });
  } else {
    // Handle the case where the user cancels the prompt or does not enter a ZIP code
    console.log('User did not enter a ZIP code');
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
            <CategoryCard title="All Dogs" imageSrc={dog2} link="/all_pets/dog" />
            <CategoryCard title="All Cats" imageSrc={kitten} link="/all_pets/cat" />
            <CategoryCard title="Other Animals" imageSrc={hamster} link="/all_pets/other" />
            {fetchedUserLocation ? (
              <CategoryCard
                title="Shelters nearby"
                imageSrc={paw}
                link={`/nearby_shelters?zipCode=${fetchedUserLocation?.zipCode}`}
              />
            ) : (
              <NoLocationCard onClick={handleViewAllPetsNearYou} message="Please provide your location to view nearby shelters." />
            )}
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
            ) : selectedAnimals.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                isFavorite={favoritePets.some((favoritePet) => favoritePet.id === pet.id)}
                isAuthenticated={isAuthenticated}
              />
            ))}
            {fetchedUserLocation ? (
            <button onClick={handleViewAllPetsNearYou} className="greater-need-cards">
              <img width="64" height="64" src="https://img.icons8.com/sf-black/64/right.png" alt="right" />
              <p><strong>View all available pets near you.</strong></p>
            </button>
            ) : (
              <NoLocationCard onClick={handleViewAllPetsNearYou} message="Please provide your location to view nearby pets" />
            )
          }
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
