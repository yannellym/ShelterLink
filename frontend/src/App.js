import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import FindApet from './pages/FindApet'; 
import Home from './pages/Home'; 
import About from './pages/About';
import Resources from './pages/Resources'; 
import Favorites from './pages/Favorites';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PetDetails from './components/PetDetails'; 
import AllPets from './pages/AllPets.js';
import LocationSpecificPets from './pages/LocationSpecificPets'; 
import PetAdoption from './pages/PetAdoption';
import Faqs from './pages/Faqs';
import PetFoster from './pages/PetFoster';


const App = () => {
  const [isSignInVisible, setIsSignInVisible] = useState(true);
  const [favoritePets, setFavoritePets] = useState([]);

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
            />} 
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
          <Route path="/signup" element={<SignUp />} />
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
