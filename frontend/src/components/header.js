// Header.js
import React from 'react';
import '../styles/Header.css'; 

function Header() {
  return (
    <header className="header">
      <nav className="main-navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Main navigation</a></li>
          <li><a href="/">ALL ABOUT PETS</a></li>
          <li><a href="/">Favorites</a></li>
        </ul>
      </nav>
      <div className="user-profile">
        <span>Yannelly Mercado (current user)</span>
      </div>
          <div className="search-bar-background"></div>
      <div className="search-bar">
        {/* ... (search bar code) */}
      </div>
      <div className="user-profile">
        {/* ... (user profile code) */}
      </div>
    </header>
  );
}

export default Header;
