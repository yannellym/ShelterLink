import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage'; 
import Home from './components/Home'; 
import About from './components/About';
import Resources from './components/Resources'; 
import FavoritesPage from './components/FavoritesPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PetDetails from './components/PetDetails'; 
import AllPetsPage from './components/AllPetsPage.js';
import LocationSpecificPets from './components/LocationSpecificPets'; 
import PetAdoption from './components/PetAdoption';
import Faqs from './components/Faqs';
import PetFoster from './components/PetFoster';


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
            <MainPage 
              favoritePets={favoritePets} 
              setFavoritePets={setFavoritePets} 
              addToFavorites={addToFavorites} 
              removeFromFavorites={removeFromFavorites}
            />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/favorites" element={
            <FavoritesPage 
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
          <Route path="/all-pets/:category" element={<AllPetsPage />} />
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
