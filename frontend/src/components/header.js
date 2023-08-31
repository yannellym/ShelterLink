// Header.js
import React from 'react';
import '../styles/Header.css'; 


const ShelterLinkLogo = '/images/ShelterLinkw.png';


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
          <li><a href="/"> Home </a></li>
          <li><a href="/find-a-pet"> Find a pet </a></li>
          <li><a href="/about"> About </a></li>
          <li><a href="/resources"> Resources </a></li>
          <li><a href="/favorites"> Favorites </a></li>
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