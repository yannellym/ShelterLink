// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; 

function Footer({ userLocation }) {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>RESOURCES</h4>
        <ul>
          <li><Link to="/pet-faqs">FAQs</Link></li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>ADOPT OR GET INVOLVED</h4>
        <ul>
          <li> <Link to="/pet-adoption">Adopting Pets</Link></li>
          <li><Link to={`/nearby_shelters?zipCode=${userLocation?.zipCode || '01841'}`}>Animal Shelters & Rescues</Link></li>
          <button  onClick={() => window.location.href = "/find-a-pet"}>
            ADOPT
          </button>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Pet Training</h4>
        <ul>
          <li><Link to="/pet-training">Training your pets</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4> FOSTER OR GET INVOLVED</h4>
        <ul>
          <li><Link to="/pet-foster">What is fostering?</Link></li>
          <li><Link to="https://www.aspcapro.org/adoption-placement/foster-care">Foster Resources</Link></li>
          <button  onClick={() => window.location.href = `/nearby_shelters?zipCode=${userLocation?.zipCode || "01841" }`}>
            FOSTER
          </button>
        </ul>
      </div>
      <div className="footer-section">
        <h4>To get the latest on pet adoption and pet care, sign up for the Petfinder newsletter.</h4>
        <button className="sign-up-button" onClick={() => window.location.href = "https://profiles.petfinder.com/subscription/subscribe/brand/PF?sc=PFOptinFooter201707&_gl=1*dfpi6t*_ga*MjEyMjEyMTk4OC4xNjkzNTE0MTg0*_ga_5H1R91DP2Q*MTY5NzEyODE2Ni4zMi4xLjE2OTcxMjg0MzkuMC4wLjA."}>
          SIGN UP
        </button>
      </div>
    </footer>
  );
}

export default Footer;
