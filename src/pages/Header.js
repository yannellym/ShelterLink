import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import ShelterLinkLogo from '../images/ShelterLinkw.png';

const Header = ({ user, handleSignOut, handleSignIn}) => {
  
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src={ShelterLinkLogo} alt="ShelterLink Logo" />
      </div>

      {/* Navigation */}
      <nav className="main-navigation">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/find-a-pet">Find a pet</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          {/* only display the profile page if the user is signed in  */}
          {user && (<li><Link to="/profile">Profile</Link></li>)}
        </ul>
      </nav>

      {/* User profile */}
      <div className="user-profile">
        {user? (
          <Link to="/home">
            <button onClick={handleSignOut} >Sign Out</button>
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
}

export default Header;
