import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './pages/Header.js';
import Footer from './pages/Footer.js';
import FindApet from './pages/FindApet.js'; 
import Home from './pages/Home.js'; 
import About from './pages/About.js';
import Resources from './pages/Resources.js'; 
import Favorites from './pages/Favorites.js';
import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
import PetDetails from './components/PetDetails.js'; 
import AllPets from './pages/AllPets.js';
import LocationSpecificPets from './pages/LocationSpecificPets.js'; 
import PetAdoption from './pages/PetAdoption.js';
import Faqs from './pages/Faqs.js';
import PetFoster from './pages/PetFoster.js';

import {Amplify} from 'aws-amplify';
import { withAuthenticator} from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


import awsExports from './aws-exports';
Amplify.configure(awsExports);


const App = () => {
  const [isSignInVisible, setIsSignInVisible] = useState(true);
  const [favoritePets, setFavoritePets] = useState([]);
  const location = useLocation();

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

  return (
    <div>
      <Header />
        <Routes>
          <Route path="/" element={
           <Home 
             favoritePets={favoritePets} 
             setFavoritePets={setFavoritePets} 
             addToFavorites={addToFavorites} 
             removeFromFavorites={removeFromFavorites} 
           />
          }
        />
          <Route path="/find-a-pet" element={
            <FindApet 
              favoritePets={favoritePets} 
              setFavoritePets={setFavoritePets} 
              addToFavorites={addToFavorites} 
              removeFromFavorites={removeFromFavorites}
            />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/favorites" element={
            <Favorites
              favoritePets={favoritePets} 
              removeFromFavorites={removeFromFavorites} 
            />} 
          />
          <Route path="/signup" element={
            <Authenticator>
            {({ signOut, user }) => (
              <main>
                <div className="App">
                  <header className="App-header">
                  <button onClick={signOut}>Sign out</button>
                  <h2>My App Content</h2>
                  </header>
                </div>
              </main>
            )}
          </Authenticator>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/pet-details/:petId" element={
            <PetDetails 
              favoritePets={favoritePets} 
              setFavoritePets={setFavoritePets} 
              addToFavorites={addToFavorites} 
              removeFromFavorites={removeFromFavorites}
            />} 
          />
          <Route path="/all-pets/:category" element={<AllPets />} />
          <Route path="/location-specific-pets" element={
            <LocationSpecificPets 
              favoritePets={favoritePets} 
              setFavoritePets={setFavoritePets} 
              addToFavorites={addToFavorites} 
              removeFromFavorites={removeFromFavorites}  
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
        </Routes>
      <Footer />
    </div>
  );
};

export default App;
