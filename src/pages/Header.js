import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import ShelterLinkLogo from '../images/logo1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const Header = ({ user, handleSignOut, userLocation }) => {
  const navigate = useNavigate();
  const [previousPage, setPreviousPage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setPreviousPage(window.location.pathname);
  }, []);

  const handleFindAPetClick = () => {
    setPreviousPage(window.location.pathname);
    navigate('/find-a-pet', { state: { userLocation } });
  };

  const handleSignInClick = () => {
    localStorage.setItem('previousPage', previousPage);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      {/* Logo */}
      <div className="logo">
        <img src={ShelterLinkLogo} alt="ShelterLink Logo" />
      </div>

      {/* Hamburger Menu Button */}
      <div className="hamburger-menu" onClick={handleMobileMenuToggle}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navigation */}
      <nav className={`main-navigation ${mobileMenuOpen ? 'mobile-menu' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/find-a-pet" onClick={handleFindAPetClick}>Find a pet</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          {user && <li><Link to="/favorites">Favorites</Link></li>}
          {user && <li><Link to="/profile">Profile</Link></li>}
          <li>
            <Link to="/forum">
              Forum <FontAwesomeIcon icon={faComments} className="forum-icon" />
            </Link>
          </li>
          {user ? (
            <Link to="/" className="auth-button">
              <button onClick={handleSignOut}>Sign Out</button>
            </Link>
          ) : (
            <Link to="/auth">
              <button onClick={handleSignInClick}>Sign In</button>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
