// AdoptionInfoSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css'; 

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-image">
          <img
            src="/images/about-image.jpg"
            alt="About ShelterLink"
          />
        </div>
        <h2>About Us</h2>
        <p>
          Welcome to ShelterLink, your online platform for finding the perfect
          furry companion. Our mission is to connect animal lovers with
          adoptable pets from shelters and rescues across the country.
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
        <Link to="/find-a-pet" className="square">
          <h3>Find a Dog</h3>
        </Link>
        <Link to="/dogs" className="square">
          <h3>Dogs Nearby</h3>
        </Link>
        <Link to="/nearby-pets" className="square">
          <h3>Pets Nearby</h3>
        </Link>
      </div>
    </div>
  );
};

export default About;