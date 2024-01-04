// Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import ShelterLinkLogo from '../images/ShelterLinkw.png';

const Header = ({ user, handleSignOut, userLocation }) => {
  const navigate = useNavigate();

  const handleFindAPetClick = () => {
    navigate('/find-a-pet', { state: { userLocation } });
  };

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
          {/* Pass the userLocation as state when the link is clicked */}
          <li><Link to="/find-a-pet" onClick={handleFindAPetClick}>Find a pet</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          {/* only display the profile and favorite pages if the user is signed in  */}
          {user && (<li><Link to="/favorites">Favorites</Link></li>)}
          {user && (<li><Link to="/profile">Profile</Link></li>)}
        </ul>
      </nav>
      {/* User profile */}
      <div className="user-profile">
        {user ? (
          <Link to="/">
            <button onClick={handleSignOut}>Sign Out</button>
          </Link>
        ) : (
          <div className="nav-item">
            <Link to="/auth">
              <button>Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;