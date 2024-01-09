// Footer.js
import React from 'react';
import '../styles/Footer.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>RESOURCES</h4>
        <ul>
          <li>FAQs</li>
          <li>News Center</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>ADOPT OR GET INVOLVED</h4>
        <ul>
          <li>All Adopt or Get Involved</li>
          <li>Adopting Pets</li>
          <li>Animal Shelters & Rescues</li>
          <li>Other Types of Pets</li>
          <button  onClick={() => window.location.href = "https://profiles.petfinder.com/subscription/subscribe/brand/PF?sc=PFOptinFooter201707&_gl=1*dfpi6t*_ga*MjEyMjEyMTk4OC4xNjkzNTE0MTg0*_ga_5H1R91DP2Q*MTY5NzEyODE2Ni4zMi4xLjE2OTcxMjg0MzkuMC4wLjA."}>
            ADOPT
          </button>
        </ul>
      </div>
      <div className="footer-section">
        <h4>ABOUT DOGS & CATS </h4>
        <ul>
          <li>Kittens</li>
          <li>Puppies</li>
          <li>Adult Dogs</li>
          <li>Adult Cats</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4> FOSTER OR GET INVOLVED</h4>
        <ul>
          <li>What is fostering?</li>
          <li>Foster Resources</li>
          <li>Foster Group</li>
          <li>FAQs</li>
          <button  onClick={() => window.location.href = "https://profiles.petfinder.com/subscription/subscribe/brand/PF?sc=PFOptinFooter201707&_gl=1*dfpi6t*_ga*MjEyMjEyMTk4OC4xNjkzNTE0MTg0*_ga_5H1R91DP2Q*MTY5NzEyODE2Ni4zMi4xLjE2OTcxMjg0MzkuMC4wLjA."}>
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
