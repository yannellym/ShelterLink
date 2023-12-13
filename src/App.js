import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './pages/Header.js';
import Footer from './pages/Footer.js';
import FindApet from './pages/FindApet.js'; 
import Home from './pages/Home.js'; 
import About from './pages/About.js';
import Resources from './pages/Resources.js'; 
import Favorites from './pages/Favorites.js';
import Profile from './pages/Profile.js';
import PetDetails from './components/PetDetails.js'; 
import AllPets from './pages/AllPets.js';
import LocationSpecificPets from './pages/LocationSpecificPets.js'; 
import PetAdoption from './pages/PetAdoption.js';
import Faqs from './pages/Faqs.js';
import PetFoster from './pages/PetFoster.js';
import NearbyShelters from './pages/NearbyShelters.js';
import NearbyPets from './pages/NearbyPets.js';

import { Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);


const App = () => {
  const [favoritePets, setFavoritePets] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const [previousPageURL, setPreviousPageURL] = useState('');
  const [user, setUser] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Functions for Managing Favorites
  const addToFavorites = (pet) => {
    if (!favoritePets.some((favoritePet) => favoritePet.id === pet.id)) {
      setFavoritePets([...favoritePets, pet]);
    }
  };

  const removeFromFavorites = (petId) => {
    const updatedFavorites = favoritePets.filter((pet) => pet.id !== petId);
    setFavoritePets(updatedFavorites);
  };

  useEffect(() => {
    if (!user && window.location.pathname === '/favorites') {
      localStorage.setItem('previousPage', location.pathname);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate('/auth');
      }, 2000); // Wait for 2 seconds before redirecting
    }
  }, [navigate]);

    // Function to handle sign-out
    const handleSignOut = async () => {
      try {
        await Auth.signOut();
        setUser(false); // Clear the user state
        navigate('/');
      } catch (error) {
        console.log('Error signing out: ', error);
      }
    };


  return (
    <div>
      <Header user={user} handleSignOut={handleSignOut}/>
        <Routes>
          <Route path="/" element={
           <Home 
             favoritePets={favoritePets} 
             setFavoritePets={setFavoritePets} 
             addToFavorites={addToFavorites} 
             removeFromFavorites={removeFromFavorites} 
             isAuthenticated={user}
           />
          }
        />
          <Route path="/find-a-pet" element={
            <FindApet 
              favoritePets={favoritePets} 
              setFavoritePets={setFavoritePets} 
              addToFavorites={addToFavorites} 
              removeFromFavorites={removeFromFavorites}
              isAuthenticated={user}
            />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          {/* if user is signed in, allow them to see the favorites. If not, redirect them to sign in */}
          <Route path="/favorites" element={
            user ? (
              <Favorites
                favoritePets={favoritePets}
                removeFromFavorites={removeFromFavorites}
                isAuthenticated={user}
              />
            ) : 
            (
              <div>
                {showMessage && <h1>Please log in first to view favorites!</h1>}
                <h1>Redirecting to sign in page ... </h1>
              </div>
            )}
          />
          {user && (
          <Route path="/profile" element={<Profile user={user} />} />
          )}
          <Route path="/auth" element={
              <Authenticator>
              {({ user }) => {
                setUser(user);
                console.log('User state after setting:', user);
                // Get the previously stored URL
                const previousURL = localStorage.getItem('previousURL');
                const favoritePetString = localStorage.getItem('favoritePet');
                const favoritePet = JSON.parse(favoritePetString);
                
                if (previousURL) {
                  if (favoritePet) {
                    console.log(favoritePet.propertyName, "almost favorite pet")
                    addToFavorites(favoritePet)
                    
                    // Clear the stored favorite pet ID in local storage
                    localStorage.removeItem('favoritePetId');
                  } 
                  // Clear the stored URL
                  localStorage.removeItem('previousURL');

                  // Navigate to the previous URL
                  navigate(previousURL);
                } else {
                  // If no previous URL is stored, navigate to the profile page
                  navigate('/profile');
                }
              }}
            </Authenticator>
            } 
          />
          <Route path="/pet-details/:petId" element={
            <PetDetails 
              favoritePets={favoritePets} 
              setFavoritePets={setFavoritePets} 
              addToFavorites={addToFavorites} 
              removeFromFavorites={removeFromFavorites}
              isAuthenticated={user} 
            />} 
          />
          <Route path="/all_pets/:type" element={<AllPets />} />
          <Route path="/location-specific-pets" element={
            <LocationSpecificPets 
              favoritePets={favoritePets} 
              setFavoritePets={setFavoritePets} 
              addToFavorites={addToFavorites} e
              removeFromFavorites={removeFromFavorites}  
              isAuthenticated={user}
            />}  
          />
          <Route path="/pet-adoption" element = {
            <PetAdoption 
            />}
          />
          <Route path="/pet-faqs" element = {
            <Faqs
            />}
          />
          <Route path="/pet-foster" element = {
            <PetFoster
            />}
          />
          <Route path="/nearby_pets" element = {
            <NearbyPets
            />}
          />
          <Route path="/nearby_shelters" element = {
            <NearbyShelters 
            />}
          />
        </Routes>
      <Footer />
    </div>
  );
};

export default App;
