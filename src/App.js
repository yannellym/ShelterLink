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
import useUserLocation from './hooks/useUserLocation.js';

import './styles/App.css';

import { Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { getUser } from './graphql/queries.js';
import { API, graphqlOperation } from 'aws-amplify';
import { createUser } from './graphql/mutations.js';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const AuthenticatorComponent = ({ setUser, navigate }) => {
  useEffect(() => {
    const checkUserAndNavigate = async () => {
      try {
        // Check if the user is authenticated
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        setUser(authenticatedUser);

        // Check if the user is already in the database
        const userData = await API.graphql(graphqlOperation(getUser, { id: authenticatedUser.attributes.sub }));
        const existingUser = userData.data.getUser;
        console.log("user already in the database", existingUser);

        if (!existingUser) {
          // If the user doesn't exist, add them to the database
          console.log('Adding new user to the database:');
          const newUser = {
            id: authenticatedUser.attributes.sub,
            username: authenticatedUser.attributes.name || '',
            email: authenticatedUser.attributes.email || '',
          };

          // Call the createUser mutation
          const createdUser = await API.graphql(graphqlOperation(createUser, { input: newUser }));
          console.log('GraphQL Response after adding user:', createdUser);
        }

        // Redirect to the profile page
        navigate('/profile');
      } catch (error) {
        console.error('Error checking/creating user:', error);
      }
    };

    // Call the function when the component mounts
    checkUserAndNavigate();
  }, [setUser, navigate]);

  return null; // or any loading indicator you want to render during authentication check
};

const App = () => {
  const [favoritePets, setFavoritePets] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const [user, setUser] = useState(false);
  const { userLocation: fetchedUserLocation, loading: locationLoading, error: locationError, ready } = useUserLocation();

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
  }, [user, location, navigate]);

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
      <Header user={user} handleSignOut={handleSignOut} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userLocation={fetchedUserLocation}
              favoritePets={favoritePets}
              setFavoritePets={setFavoritePets}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isAuthenticated={user}
            />
          }
        />
        <Route
          path="/find-a-pet"
          element={
            <FindApet
              userLocation={fetchedUserLocation}
              favoritePets={favoritePets}
              setFavoritePets={setFavoritePets}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isAuthenticated={user}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        {/* if the user is signed in, allow them to see the favorites. If not, redirect them to sign in */}
        <Route
          path="/favorites"
          element={
            user ? (
              <Favorites
                favoritePets={favoritePets}
                removeFromFavorites={removeFromFavorites}
                isAuthenticated={user}
              />
            ) : (
              <div>
                {showMessage && <h1>Please log in first to view favorites!</h1>}
                <h1>Redirecting to sign in page ... </h1>
              </div>
            )
          }
        />
        {user && <Route path="/profile" element={<Profile user={user} />} />}
        <Route
          path="/auth"
          element={
            <div className="auth-container">
              <Authenticator>
                {() => <AuthenticatorComponent setUser={setUser} navigate={navigate} />}
              </Authenticator>
            </div>
          }
        />
        <Route
          path="/pet-details/:petId"
          element={
            <PetDetails
              favoritePets={favoritePets}
              setFavoritePets={setFavoritePets}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isAuthenticated={user}
            />
          }
        />
        <Route path="/all_pets/:type" element={<AllPets />} />
        <Route
          path="/location-specific-pets"
          element={
            <LocationSpecificPets
              favoritePets={favoritePets}
              setFavoritePets={setFavoritePets}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isAuthenticated={user}
            />
          }
        />
        <Route path="/pet-adoption" element={<PetAdoption />} />
        <Route path="/pet-faqs" element={<Faqs />} />
        <Route path="/pet-foster" element={<PetFoster />} />
        <Route path="/nearby_pets" element={<NearbyPets userLocation={fetchedUserLocation} />} />
        <Route path="/nearby_shelters" element={<NearbyShelters userLocation={fetchedUserLocation} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
