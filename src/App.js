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
import { createUser,  createUserPetFavorite, deleteUserPetFavorite,  createPet } from './graphql/mutations.js';
import { getPet, listUserPetFavorites } from './graphql/queries'; 


import awsExports from './aws-exports';
Amplify.configure(awsExports);

const AuthenticatorComponent = ({ setUser, navigate }) => {
  useEffect(() => {
    const checkUserAndNavigate = async () => {
      try {
        // Check if the user is authenticated
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        localStorage.setItem('previousPage', location.pathname);

        // Check if the user is already in the database
        const userData = await API.graphql(graphqlOperation(getUser, { id: authenticatedUser.attributes.sub }));
        const existingUser = userData.data.getUser;
        console.log("user already in the database", existingUser);
        //Set a flag indicating whether the user is in the database
        const isUserInDB = !!existingUser;

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
          
          setUser(authenticatedUser);
          console.log('GraphQL Response after adding user:', createdUser);

          // Redirect to the home page if the user is not in the database
          navigate('/');
        } else {
          console.log("user already in, checking  previous page")
          // If the user is already in the database, redirect to the previous page
          const previousPage = localStorage.getItem('previousPage');
          console.log(previousPage)
          if (previousPage) {
            console.log("theres a previous page")
            // Clear the previous page from local storage
            localStorage.removeItem('previousPage');
            navigate(-1); 
          } else {
            // If no previous page, redirect to the home page
            return true
          }
        }
        console.log("setting user")
        setUser(authenticatedUser);
      } catch (error) {
        console.error('Error checking/creating user:', error);
      }
    };

    // Call the function when the component mounts
    checkUserAndNavigate();
  }, [setUser, navigate]);
};

const App = () => {
  const [favoritePets, setFavoritePets] = useState([]);
  const [favorited, setFavorited] = useState(true);
  const [showMessage, setShowMessage] = useState(true);
  const [user, setUser] = useState(false);
  const { userLocation: fetchedUserLocation, loading: locationLoading, error: locationError, ready } = useUserLocation();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // once the user is authenticated, check if the pet is in the user's favorite pets, 
  // if so, remove it, if not, check if the pet is already created (if not, create it), 
  // if yes, add it to the user's favorite pets
  const handleToggleFavorite = async (pet) => {
    if (user) {
      console.log('USER AUTHENTICATED')
      setFavorited(!favorited);

      try {

        console.log(user, pet, "USER SAND PET ID") 
        const userId = user.attributes.sub;
        const petId = pet.id;
        // Check if the pet is already favorited
        const response = await API.graphql(graphqlOperation(listUserPetFavorites));
        const userFavoritedPets = response.data.listUserPetFavorites.items;
        console.log(userFavoritedPets, "FAVORITE PETS OF ISER")
        
        // Find the user-pet-favorite entry based on petId
        const userPetFavorite = userFavoritedPets.find((entry) => entry.petId === String(petId));

        if (userPetFavorite ) {
          // Remove pet from user's favorite pets
          const response = await API.graphql(graphqlOperation(deleteUserPetFavorite, { input: { id: userPetFavorite.id} }));
          console.log(response, "RES OF REMOVIGN")
          // Update the list of favorite pets in the component state
          removePetFromFavorites(petId);
          const remaining_pets = await API.graphql(graphqlOperation(listUserPetFavorites));
          console.log(remaining_pets, "REmaining pets")
        } else {
          console.log("TRYING TO GET PET FROM TABLE");
          const petExists = await API.graphql(graphqlOperation(getPet, { id: petId }));

          if (!petExists.data.getPet) {
            console.log("Pet doesn't exist in the DB");
            const petInput = {
              id: petId,
              name: pet.name,
              age: pet.age,
              gender: pet.gender,
              size: pet.size,
              breeds: {
                primary: pet.breeds?.primary || '',
                secondary: pet.breeds?.secondary || '',
                mixed: pet.breeds?.mixed || false,
                unknown: pet.breeds?.unknown || false,
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
            console.log("creating pet in DB", petInput);
 
            // Now create the pet
            const createPetResponse = await API.graphql(graphqlOperation(createPet, { input: petInput }));
            if (createPetResponse.errors) {
              // Log any errors in the response
              console.error('Error creating pet:', createPetResponse.errors);
            }
            console.log("createPetResponse:", createPetResponse);

            const createdPetId = createPetResponse.data.createPet.id;
            console.log(createdPetId, "created a pet with id");

            // Link the pet to the user in userPetFavorite table
            const userPetFavoriteInput = {
              userId: userId,
              petId: createdPetId, // Use the ID of the newly created pet
              createdAt: new Date().toISOString(),
            };

            await API.graphql(graphqlOperation(createUserPetFavorite, { input: userPetFavoriteInput }));
            console.log("Pet added to user's favorites");
          } else {
            // The pet already exists, link it to the user in userPetFavorite table
            const userPetFavoriteInput = {
              userId: userId,
              petId: petId,
              createdAt: new Date().toISOString(),
            };

            await API.graphql(graphqlOperation(createUserPetFavorite, { input: userPetFavoriteInput }));
            console.log("Pet added to user's favorites");
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
      localStorage.setItem('previousURL', window.location.pathname);
      localStorage.setItem('favoritePet', JSON.stringify(pet));
      navigate('/auth');
    }
  };
  
  // Function to remove a pet from the state based on its ID
  const removePetFromFavorites = (petId) => {
    setFavoritePets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
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
              handleToggleFavorite={handleToggleFavorite} 
              removePetFromFavorites={removePetFromFavorites}
              user={user}
            />
          }
        />
        <Route
          path="/find-a-pet"
          element={
            <FindApet
              userLocation={fetchedUserLocation}
              removePetFromFavorites={removePetFromFavorites}
              handleToggleFavorite={handleToggleFavorite}
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
                removePetFromFavorites={removePetFromFavorites}
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
              removePetFromFavorites={removePetFromFavorites}
              setFavoritePets={setFavoritePets}
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
              removePetFromFavorites={removePetFromFavorites}
              setFavoritePets={setFavoritePets}
              handleToggleFavorite={handleToggleFavorite}
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
