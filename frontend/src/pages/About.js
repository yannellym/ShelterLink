// AdoptionInfoSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css'; 
import ShelterLinkLogo from '../images/ShelterLinknb.png';

const About = () => {
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
        <Link to="https://www.google.com/search?q=animal+shelters+near+me&sca_esv=572280770&sxsrf=AM9HkKlxuAD2GjmPPBX4r_1lHGwfbdLmpA%3A1696961336649&ei=OJMlZa2EJ_yoqtsP5fCDsAI&ved=0ahUKEwitgKzNieyBAxV8lGoFHWX4ACYQ4dUDCBA&uact=5&oq=animal+shelters+near+me&gs_lp=Egxnd3Mtd2l6LXNlcnAiF2FuaW1hbCBzaGVsdGVycyBuZWFyIG1lMggQABiKBRiRAjIIEAAYigUYkQIyCBAAGIoFGJECMgUQABiABDIGEAAYBxgeMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIIEAAYgAQYsQNItiBQAFiUH3AAeAGQAQCYAWqgAfYHqgEDOC4zuAEDyAEA-AEBwgIHEAAYgAQYCsICCBAAGAcYHhgKwgILEAAYBxgeGPEEGArCAgcQABgNGIAEwgIIEAAYBRgeGA3iAwQYACBBiAYB&sclient=gws-wiz-serp" className="square">
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