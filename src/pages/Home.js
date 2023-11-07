import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import usePetFinderAPI from '../hooks/usePetFinderAPI'; // hook
import useAnimalsBasedOnPreferencesAPI from '../hooks/useAnimalsBasedOnPreferencesAPI'; // hook


function Home({ favoritePets, addToFavorites, removeFromFavorites, userPreferences, isAuthenticated }) {
  const [loading, setLoading] = useState(true);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [selectedPetIndex, setSelectedPetIndex] = useState(0); // Track the currently displayed pet

  const { data: petData } = usePetFinderAPI(
    'http://localhost:3002/api/petfinder?perPage=200',
    []
  );
  console.log(isAuthenticated, "isauthenticated in home")
  useEffect(() => {
    if (petData && petData.animals) {
      setLoading(false);
      // Select 4 animals from the fetched data
      const animals = petData.animals.filter((animal) => animal.photos.length > 0).slice(0, 4);

      if (animals.length < 4) {
        // If there are fewer than 4 animals, fetch more data to reach 4
        const remainingAnimalsCount = 4 - animals.length;
        const additionalAnimals = petData.animals.slice(0, remainingAnimalsCount);
        setSelectedAnimals([...animals, ...additionalAnimals]);
      } else {
        setSelectedAnimals(animals);
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
            <CategoryCard title="All Dogs" imageSrc={dog2} link="/all-pets/dog" />
            <CategoryCard title="All Cats" imageSrc={kitten} link="/all-pets/cat" />
            <CategoryCard title="Other Animals" imageSrc={hamster} link="/all-pets/other" />
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
            <Link to="/find-a-pet" className="greater-need-cards">
              <img width="64" height="64" src="https://img.icons8.com/sf-black/64/right.png" alt="right" />
              <p><strong>View all available pets near you.</strong></p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
