import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import ShelterLinkLogo from '../images/ShelterLinkw.png';
import { Auth } from 'aws-amplify';

const Header = ({ user, handleSignOut, userLocation }) => {
  const navigate = useNavigate();
  const [previousPage, setPreviousPage] = useState('');

  useEffect(() => {
    setPreviousPage(window.location.pathname);

    // Check if the user is authenticated when the component mounts
    const checkUserAuthentication = async () => {
      try {
        await Auth.currentAuthenticatedUser();
      } catch (error) {
        console.log(error)
      }
    };
 
    checkUserAuthentication();
  }, []);

  const handleFindAPetClick = () => {
    setPreviousPage(window.location.pathname);
    navigate('/find-a-pet', { state: { userLocation } });
  };

  const handleSignInClick = () => {
    localStorage.setItem('previousPage', previousPage);
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
          <li><Link to="/find-a-pet" onClick={handleFindAPetClick}>Find a pet</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          {user && <li><Link to="/favorites">Favorites</Link></li>}
          {user && <li><Link to="/profile">Profile</Link></li>}
        </ul>
      </nav>
       
      {/* Sign-in button */}
      <div className="user-profile">
        {user? (
          <Link to="/">
            <button onClick={handleSignOut}>Sign Out</button>
          </Link>
        ) : (
          <div className="nav-item">
            <Link to="/auth">
              <button onClick={handleSignInClick}>Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
