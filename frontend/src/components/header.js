// Header.js
import React from 'react';

function Header() {
  return (
    <header>
      <div className="logo">PetFinder</div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          {/* Add more navigation links */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
