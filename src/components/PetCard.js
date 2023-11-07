//card to display a preview of the pet's information
import React, { useState } from 'react';
import '../styles/PetCard.css';
import { Link, useNavigate } from 'react-router-dom';
import coming_soon from "../images/coming_soon.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons';

const PetCard = ({ pet, addToFavorites, removeFromFavorites, isFavorite, isAuthenticated }) => {
  const [favorited, setFavorited] = useState(isFavorite);
  const navigate = useNavigate();

  console.log(isAuthenticated, "AUTHENTICATEDDD")
  
  const handleToggleFavorite = () => {
    if (isAuthenticated) {
      setFavorited(!favorited);
      if (favorited) {
        removeFromFavorites(pet.id);
      } else {
        addToFavorites(pet);
      }
    } else {
      // If the user is not authenticated, save the current URL and then direct them to the authentication page
      localStorage.setItem('previousURL', window.location.pathname);
      // Store the pet ID in local storage to remember the favorite pet
      localStorage.setItem('favoritePet', JSON.stringify(pet));
      // If the user is not authenticated, direct them to the authentication page
      navigate('/auth');
    }
  };


  const handleMoreInfoClick = () => {
    // Create the URL for the new window, including the 'petData' query parameter
    const moreInfoUrl = `/pet-details/${pet.id}?petData=${encodeURIComponent(JSON.stringify(pet))}`;
  
    // Open the new window with the generated URL
    const newWindow = window.open(moreInfoUrl, '_blank');
  
    // Check if the new window was successfully opened
    if (newWindow) {
      // If opened successfully, focus on the new window
      newWindow.focus();
    } else {
      // If the new window couldn't be opened (likely due to a pop-up blocker), show an alert
      alert('Please allow pop-ups for this site to view more details.');
    }
  };
  
  
  return (
      <div className="pet-card" >
        <Link to={`/pet-details/${pet.id}?petData=${encodeURIComponent(JSON.stringify(pet))}`} target="_blank" className="pet-card-link">
          {pet.photos && pet.photos.length > 0 ? (
            <img src={pet.photos[0]?.medium} alt={pet.name} className="pet-card-image" />
          ) : (
            <img src={coming_soon} alt={pet.name} className="pet-card-image" />
          )}
          <h4>
            {pet.name.length > 9 ? pet.name.substring(0, 9) + ' ...' : pet.name}{' '}
            <span role="img" aria-label="Location">
              📍{pet.contact.address.city.substring(0, 10)},  
                {pet.contact.address.state}
            </span>
          </h4>
          <div className="pet-card-info">
            <div>
              <p>
                {pet.age} | {pet.gender} | {pet.size} | {pet.breeds.primary}
              </p>
            </div>
          </div>
          {pet.description && pet.description.length > 0 ? (
            <p className="pet-card-description">
              {pet.description && pet.description.length > 100
              ? `${pet.description.substring(0, 100)}...`
              : pet.description}</p>
          ) : (
            <p className="pet-card-description">This pet doesn't have a description.</p>
          )}
        </Link>
        <div className="pet-card-footer">
          <button className="more-info-button" onClick={handleMoreInfoClick}>
            More Info
          </button>
          <button
            className={`favorite-heart-${favorited ? 'favorited' : 'unfavorited'}`}
            onClick={handleToggleFavorite}
            tabIndex="0"
          >
          <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
  );
};

export default PetCard;
