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

import {Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


import awsExports from './aws-exports';
Amplify.configure(awsExports);


const App = () => {
  const [favoritePets, setFavoritePets] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const [previousPageURL, setPreviousPageURL] = useState('');
  const [user, setUser] = useState( Auth.user);

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
    if (!Auth.user && window.location.pathname === '/favorites') {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate('/auth');
      }, 2000); // Wait for 2 seconds before redirecting
    }
  }, [navigate]);


    // Function to handle sign-in
    const handleSignIn = async () => {
      console.log('handleSignIn function called');
      try {
        await Auth.signIn();
        const signedInUser = await Auth.currentAuthenticatedUser();
        setUser(signedInUser);
        navigate('/profile');
      } catch (error) {
        console.log('Error signing in: ', error);
      }
    }; 

    // Function to handle sign-out
    const handleSignOut = async () => {
      try {
        await Auth.signOut();
        setUser(false); // Clear the user state
        navigate('/home');
      } catch (error) {
        console.log('Error signing out: ', error);
      }
    };


  return (
    <div>
      <Header user={Auth.user} handleSignIn={handleSignIn} handleSignOut={handleSignOut}/>
        <Routes>
          <Route path="/home" element={
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
          {/* if user is signed in, allow them to see the favorites. If not, redirect them to sign in */}
          <Route path="/favorites" element={
            Auth.user ? (
              <Favorites
                favoritePets={favoritePets}
                removeFromFavorites={removeFromFavorites}
              />
            ) : 
            (
              <div>
                {showMessage && <h1>Please log in first to view favorites!</h1>}
                <h1>Redirecting to sign in page ... </h1>
              </div>
            )}
          />
          {Auth.user && (
          <Route path="/profile" element={<Profile user={user} />} />
          )}
          <Route path="/auth" element={
            <Authenticator>
              {({ signOut, user }) => (
                navigate('/profile')
              )}
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
