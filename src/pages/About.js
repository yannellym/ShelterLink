// AdoptionInfoSection.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css'; 
import ShelterLinkLogo from '../images/ShelterLinknb.png';

const About = (userLocation) => {
  console.log(userLocation, "locatd passed in");
  const [fetchedUserLocation, setUserLocation] = useState(userLocation?.zipCode);

  useEffect(() => {
    // Update the user location state when it's fetched
    if (userLocation) {
      setUserLocation(userLocation.zipCode);
      console.log(fetchedUserLocation, "fetch user location in")
    }
  }, [userLocation]);
  

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-image">
          <img
            src={ShelterLinkLogo}
            alt="About ShelterLink"
          />
        </div>
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
        <Link to={`/nearby_shelters?zipCode=${ userLocation?.userLocation.zipCode}`}>
          <h3>Find a Shelter</h3>
        </Link>
        <Link to="/resources" className="square">
          <h3>Resources</h3>
        </Link>
        <Link to="/find-a-pet" className="square">
          <h3>Pets Nearby</h3>
        </Link>
      </div>
    </div>
  );
};

export default About;
