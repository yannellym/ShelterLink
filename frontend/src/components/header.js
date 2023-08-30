// Header.js
import React from 'react';
import '../styles/Header.css'; 
import ShelterLinkLogo from '../images/ShelterLinkw.png'; // Import the logo image

function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src={ShelterLinkLogo} alt="ShelterLink Logo" />
      </div>

      {/* Navigation */}
      <nav className="main-navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Main navigation</a></li>
          <li><a href="/">All about pets</a></li>
          <li><a href="/">Favorites</a></li>
        </ul>
      </nav>

      {/* User profile */}
      <div className="user-profile">
        <span>Yannelly Mercado (current user)</span>
      </div>
    </header>
  );
}

export default Header;