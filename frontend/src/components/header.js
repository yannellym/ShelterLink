// Header.js
import React from 'react';
import '../styles/Header.css'; 

function Header() {
  return (
    <header>
      <div className="logo">PetFinder</div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          {/* more navigation links */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
