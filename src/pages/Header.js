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

  const handleLinkClick = () => {
    setMobileMenuOpen(false); // Close the mobile menu
  };

  const handleFindAPetClick = () => {
    setPreviousPage(window.location.pathname);
    navigate('/find-a-pet', { state: { userLocation } });
    handleLinkClick(); // Close the mobile menu
  };

  const handleSignInClick = () => {
    localStorage.setItem('previousPage', previousPage);
    handleLinkClick(); // Close the mobile menu
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };


  return (
    <header className={`header ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      {/* Logo */}
      <div className="logo">
        <Link to="/" onClick={handleLinkClick}>
          <img src={ShelterLinkLogo} alt="ShelterLink Logo" />
        </Link>
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
          <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
          <li><Link to="/find-a-pet" onClick={handleFindAPetClick}>Find a pet</Link></li>
          <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
          <li><Link to="/resources" onClick={handleLinkClick}>Resources</Link></li>
          {user && <li><Link to="/favorites" onClick={handleLinkClick}>Favorites</Link></li>}
          {user && <li><Link to="/profile" onClick={handleLinkClick}>Profile</Link></li>}
          <li>
            <Link to="/forum" onClick={handleLinkClick}>
              Forum <FontAwesomeIcon icon={faComments} className="forum-icon" />
            </Link>
          </li>
          {user ? (
            <Link to="/" className="auth-button" onClick={handleLinkClick}>
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
