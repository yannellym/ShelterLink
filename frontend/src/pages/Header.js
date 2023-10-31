import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

import ShelterLinkLogo from '../images/ShelterLinkw.png';

const Header = () => {
  const [user, setUser] = useState(null); // Replace with your user state logic

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src={ShelterLinkLogo} alt="ShelterLink Logo" />
      </div>

      {/* Navigation */}
      <nav className="main-navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/find-a-pet">Find a pet</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
      </nav>

      {/* User profile */}
      <div className="user-profile">
        {user ? (
          <span>{user.name}</span>
        ) : (
          <div className="nav-item">
            <Link to="/SignIn">
              <button>Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
