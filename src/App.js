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
import PetTraining from './pages/PetTraining.js';
import Faqs from './pages/Faqs.js';
import PetFoster from './pages/PetFoster.js';
import NearbyShelters from './pages/NearbyShelters.js';
import NearbyPets from './pages/NearbyPets.js';
import Forum from './pages/Forum.js';
import useUserLocation from './hooks/useUserLocation.js';
import Replies from './pages/Replies.js';

import './styles/App.css';
import default_pic from './images/dandc.jpeg';

import { Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { getUser } from './graphql/queries.js';
import { API, graphqlOperation } from 'aws-amplify';
import { createUser,  createUserPetFavorite, deleteUserPetFavorite,  createPet } from './graphql/mutations.js';
import { getPet, listUserPetFavorites } from './graphql/queries'; 


import awsExports from './aws-exports.js';
Amplify.configure(awsExports);

const AuthenticatorComponent = ({ setUser, navigate }) => {
  useEffect(() => {
    const checkUserAndNavigate = async () => {
      try {
        // Check if the user is already authenticated
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log('Stored User:', storedUser);
        if (storedUser) {
          setUser(storedUser);
          navigate('/favorites');
        } else {
          // If not authenticated, check and authenticate the user
          const authenticatedUser = await Auth.currentAuthenticatedUser();
          const userData = await API.graphql(graphqlOperation(getUser, { id: authenticatedUser.attributes.sub }));
          const existingUser = userData.data.getUser;

          if (!existingUser) {
            const newUser = {
              id: authenticatedUser.attributes.sub,
              username: authenticatedUser.attributes.name || '',
              email: authenticatedUser.attributes.email || '',
            };

            const createdUser = await API.graphql(graphqlOperation(createUser, { input: newUser }));

            setUser(createdUser);
            // Store the user in local storage
            localStorage.setItem('user', JSON.stringify(createdUser));
            navigate('/favorites');
          } else {
            setUser(authenticatedUser);
            // Store the user in local storage
            localStorage.setItem('user', JSON.stringify(authenticatedUser));
            navigate('/favorites');
          }
        }
      } catch (error) {
        console.error('Error checking/creating user:', error);
      }
    };

    checkUserAndNavigate();
  }, [setUser, navigate]);

  return null;
};



const App = () => {
  const [favoritePets, setFavoritePets] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const [user, setUser] = useState(null); //  initial state  is null
  const { userLocation: fetchedUserLocation } = useUserLocation();

  const location = useLocation();
  const navigate = useNavigate();
  
  console.log(user, "USER IN APP")
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // once the user is authenticated, check if the pet is in the user's favorite pets, 
  // if so, remove it, if not, check if the pet is already created (if not, create it), 
  // if yes, add it to the user's favorite pets
  const handleToggleFavorite = async (pet) => {
    if (user) {
      console.log(user, "user stored")
      try {
        const userId = user.attributes.sub;
        const petId = pet.id;
        // Check if the pet is already favorited
        const response = await API.graphql(graphqlOperation(listUserPetFavorites));
        const userFavoritedPets = response.data.listUserPetFavorites.items;
        console.log(userFavoritedPets, "FAVORITE PETS OF ISER")
        
        // Find the user-pet-favorite entry based on petId
        const userPetFavorite = userFavoritedPets.find((entry) => entry.petId === String(petId));
        console.log("is user fav ", userPetFavorite)
        if (userPetFavorite ) {
          // Remove pet from user's favorite pets
          const response = await API.graphql(graphqlOperation(deleteUserPetFavorite, { input: { id: String(userPetFavorite.id)} })); 
          console.log(response, "RES OF REMOVIGN")
          // Update the list of favorite pets in the component state
          removePetFromFavoritesState(petId);
 
          const remaining_pets = await API.graphql(graphqlOperation(listUserPetFavorites));
          console.log(remaining_pets, "REmaining pets")
        } else {
          console.log("TRYING TO GET PET FROM TABLE");
          const petExists = await API.graphql(graphqlOperation(getPet, { id: String(petId) }));
          console.log(petExists, "pet exists or not");
 
          if (!petExists.data.getPet) {
            console.log("Pet doesn't exist in the DB");
            const petInput = {
              id: petId,
              name: pet.name,
              age: pet.age,
              gender: pet.gender,
              size: pet.size,
              status: pet.status,
              breeds: {
                primary: pet.breeds.primary || '',
                secondary: pet.breeds.secondary || '',
                mixed: pet.breeds?.mixed || false,
                unknown: pet.breeds?.unknown || false,
              },
              attributes: {
                declawed: pet.attributes.declawed || false,
                house_trained: pet.attributes.house_trained || false,
                shots_current: pet.attributes.shots_current || false,
                spayed_neutered: pet.attributes.spayed_neutered || false,
                special_needs: pet.attributes.special_needs || false
              },
              description: pet.description || "No available description for this pet.",
              photos: pet.photos?.map((photo) => ({
                full: photo.full || require('./images/coming_soon.png'),
                large: photo.large || require('./images/coming_soon.png'),
                medium: photo.medium || require('./images/coming_soon.png'),
                small: photo.small || require('./images/coming_soon.png'),
              })) || [],
              contact: {
                address: {
                  address1: pet.contact?.address?.address1 || "No address provided.",
                  address2: pet.contact?.address?.address2 || "No address provided.",
                  city: pet.contact?.address?.city || "No city provided.",
                  state: pet.contact?.address?.state || "No state provided.",
                },
                email: pet.contact?.email || "No email provided",
                phone: pet.contact?.phone || "No phone provided",
              },
              url: pet.url,
            };            
            // console.log("creating pet in DB", petInput);
 
            // Now create the pet
            const createPetResponse = await API.graphql(graphqlOperation(createPet, { input: petInput }));
            if (createPetResponse.errors) {
              // Log any errors in the response
              console.error('Error creating pet:', createPetResponse.errors);
            }

            const createdPetId = createPetResponse.data.createPet.id;
            // console.log(createdPetId, "created a pet with id");

            // Link the pet to the user in userPetFavorite table
            const userPetFavoriteInput = {
              userId: userId,
              petId: createdPetId, // Use the ID of the newly created pet
              createdAt: new Date().toISOString(),
            };

            const res = await API.graphql(graphqlOperation(createUserPetFavorite, { input: userPetFavoriteInput }));
            console.log(res, "res from adding to fav")
            addPetToFavoritesState({id: createdPetId})
            // console.log("adding pet, we just created it",  {id: createdPetId})
            // console.log("Pet added to user's favorites");
          } else {
            // The pet already exists, link it to the user in userPetFavorite table
            const userPetFavoriteInput = {
              userId: userId,
              petId: petId,
              createdAt: new Date().toISOString(),
            };

            await API.graphql(graphqlOperation(createUserPetFavorite, { input: userPetFavoriteInput }));
            // console.log("adding pet, its already created", pet) 
            addPetToFavoritesState(pet)
            // console.log("Pet added to user's favorites");
          }
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error, e.g., show a message to the user
      } finally {
        // Re-enable the button or hide the loading indicator
      }
    } else {
      // Redirect to the authentication page
      localStorage.setItem('previousPage', window.location.pathname);
      navigate('/auth');
    }
  };

  // Function to add a pet to the state
  const addPetToFavoritesState = (pet) => {
    setFavoritePets((prevPets) => [...prevPets, pet]);
  };

  // Function to remove a pet from the state based on its ID
  const removePetFromFavoritesState = (petId) => {
    setFavoritePets((prevPets) => {
      const updatedPets = prevPets.filter((pet) => pet.id !== String(petId)); 
      return updatedPets;
    });
  };

  useEffect(() => {
    if (!user && localStorage.getItem('previousPage') === '/favorites') {
      localStorage.setItem('previousPage', '/favorites');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate('/auth');
      }, 2000); // Wait for 2 seconds before redirecting
    }
  }, [user, location, navigate, favoritePets]);
  

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      console.log("signing out")
      setUser(null);
      // Remove user information from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('previousPage');
      navigate('/');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };


  // FUNCTION to fetch a random image for the post. In case this fails, use our default photo.
  const fetchPlaceholderImage = async () => {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=animal&client_id=CQnaHevzLsFIwELZJhaYpxdy5vmXqmYivIAZWlWMmd0`);
      
      if (response.ok) {
        const data = await response.json();
        return data.urls.small; 
      }
      // Return the placeholder image if the request fails
      return default_pic;
    } catch (error) {
      console.error('Error fetching placeholder image:', error);
      // Return the placeholder image in case of an error
      return default_pic;
    }
  };
  

  return (
    <div>
      {/* Render the AuthenticatorComponent for user check on every render */}
      <AuthenticatorComponent setUser={setUser} /> 
      <Header user={user} handleSignOut={handleSignOut} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userLocation={fetchedUserLocation}
              handleToggleFavorite={handleToggleFavorite} 
              user={user}
              favoritePets={favoritePets}
            />
          }
        />
        <Route
          path="/find-a-pet"
          element={
            <FindApet
              userLocation={fetchedUserLocation}
              handleToggleFavorite={handleToggleFavorite}
              isAuthenticated={user}
              favoritePets={favoritePets}
            />
          }
        />
        <Route 
          path="/about" 
          element={
            <About 
              userLocation={fetchedUserLocation}
            />
          } 
        />
        <Route 
          path="/resources" 
          element={
            <Resources
              userLocation={fetchedUserLocation}
            />
          } 
        />
        {/* if the user is signed in, allow them to see the favorites. If not, redirect them to sign in */}
        <Route
          path="/favorites"
          element={ 
            user ? (
              <Favorites
                handleToggleFavorite={handleToggleFavorite}
                user={user}
              />
            ) : (
              <div>
                {showMessage && <h1>Please log in first to view favorites!</h1>}
                <h1>Redirecting to sign in page ... </h1>
              </div>
            )
          }
        />
        {user && <Route 
          path="/profile" 
          element={
            <Profile user={user} 
            />
          } 
        />}
        {/* if the user is signed in, allow them to see the favorites. If not, redirect them to sign in */}
        <Route
          path="/forum"
          element={ 
            // user ? (
              <Forum
                user={user}
                fetchImage={fetchPlaceholderImage}
              />
            // ) : (
            //   <div>
            //     {showMessage && <h1>Please log in first to view favorites!</h1>}
            //     <h1>Redirecting to sign in page ... </h1>
            //   </div>
            // )
          }
        />
        <Route 
          path="/replies/:postId" 
          element={ 
            <Replies 
              user={user}
              fetchImage={fetchPlaceholderImage} 
            />} 
          /> 
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
              handleToggleFavorite={handleToggleFavorite}
              isAuthenticated={user}
            />
          }
        />
        <Route path="/all_pets/:type" element={<AllPets />} />
        <Route
          path="/location-specific-pets"
          element={
            <LocationSpecificPets
              setFavoritePets={setFavoritePets}
              handleToggleFavorite={handleToggleFavorite}
              isAuthenticated={user}
              favoritePets={favoritePets}
            />
          }
        />
        <Route path="/pet-adoption" element={<PetAdoption />} />
        <Route path="/pet-foster" element={<PetFoster />} />
        <Route path="/pet-training" element={<PetTraining />} />
        <Route path="/pet-faqs" element={<Faqs />} />
        <Route path="/pet-foster" element={<PetFoster />} />
        <Route path="/nearby_pets" element={<NearbyPets userLocation={fetchedUserLocation} />} />
        <Route path="/nearby_shelters" element={<NearbyShelters userLocation={fetchedUserLocation} />} />
      </Routes>
      <Footer  userLocation={fetchedUserLocation} />
    </div>
  );
};

export default App; 