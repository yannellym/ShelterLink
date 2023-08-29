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
          <li>Mobile App Download</li>
          <li>Partnerships</li>
          <li>News Center</li>
          <li>Put Petfinder On Your Site</li>
          <li>For Developers</li>
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
        </ul>
      </div>
      <div className="footer-section">
        <h4>ABOUT DOGS & PUPPIES</h4>
        <ul>
          {/* ... (more items) */}
        </ul>
      </div>
      <div className="footer-section">
        <h4>ABOUT CATS & KITTENS</h4>
        <ul>
          {/* ... (more items) */}
        </ul>
      </div>
      <div className="footer-section">
        <h4>To get the latest on pet adoption and pet care, sign up for the Petfinder newsletter.</h4>
        <a href="#" className="sign-up-link">SIGN UP</a>
      </div>
      {/* ... (more sections) */}
    </footer>
  );
}

export default Footer;
