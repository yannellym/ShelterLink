// AdoptionInfoSection.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/About.css'; 
import ShelterLinkLogo from '../images/ShelterLinknb.png';

const About = ({ userLocation }) => {
  console.log(userLocation, "location passed in");
  const [fetchedUserLocation, setUserLocation] = useState(userLocation?.zipCode);
  const navigate = useNavigate();

  useEffect(() => {
    // Update the user location state when it's fetched
    if (userLocation) {
      setUserLocation(userLocation.zipCode);
      console.log(fetchedUserLocation, "fetch user location in");
    }
  }, [userLocation]);

  const handleViewAllPetsNearYou = ({ targetPage }) => {
    try {
      console.log(userLocation?.zipCode, "do we have a zip code")
      if (userLocation) {
        // If zipCode is available, directly navigate to the nearby_pets page
        navigate(`/${targetPage}`, { state: { fetchedUserLocation: userLocation} });
      } else if (navigator.geolocation) {
        // If geolocation is supported, attempt to get the user's current position
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userLocation = {
              latitude,
              longitude,
            };
            navigate(`/${targetPage}`, { state: { fetchedUserLocation: userLocation } });
          },
          // Handle geolocation error
        );
      } else {
        console.error('Geolocation is not supported by your browser');
        // Handle the case where there is no geolocation support
        handleZipCodeInput(targetPage);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  
  
  const handleZipCodeInput = (targetPage) => {
    // Prompt the user to enter their ZIP code
    const userEnteredZipCode = prompt('Please enter your ZIP code:');
    if (userEnteredZipCode) {
      const fetchedUserLocation = {
        zipCode: userEnteredZipCode,
      };
      
      navigate(`/${targetPage}`, { state: { fetchedUserLocation } });
    } else {
      // Handle the case where the user cancels the prompt or does not enter a ZIP code
      console.log('User did not enter a ZIP code');
    }
  };
  

  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          Welcome to ShelterLink, your online platform for finding the perfect
          furry companion. Our mission is to connect animal lovers with
          adoptable pets from shelters and rescues across the country. We aim to 
          bring awareness the trending issue of unloved pets. Helps us to find these 
          lovable pets their forever home. 
        </p>
        <p>
          We believe that every pet deserves a loving home, and we're here to
          help you on your journey to find your new best friend. With our
          advanced search filters and personalized matching system, you can
          discover pets that fit your lifestyle and preferences.
        </p>
        <p>
          Whether you're looking for a playful puppy or a calm senior cat,
          ShelterLink has a variety of pets waiting for their forever homes.
          Start your adoption journey today and make a difference in a pet's
          life.
        </p>
      </div>
      <div className="clickable-squares">
        <img
          src={ShelterLinkLogo}
          alt="About ShelterLink"
          className="about-image"
        />
        <Link to={`/nearby_shelters?zipCode=${userLocation?.zipCode}`} className="square">
          <h3>Find a Shelter</h3>
        </Link>
        <Link to="/resources" className="square">
          <h3>Resources</h3>
        </Link>
        <Link to="#" className="square" onClick={() => handleViewAllPetsNearYou({ targetPage: 'nearby_pets' })}>
          <h3>Pets Nearby</h3>
        </Link>

      </div>
    </div>
  );
};

export default About;
