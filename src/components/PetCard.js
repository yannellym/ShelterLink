//card to display a preview of the pet's information
import React, { useState, useEffect } from 'react';
import '../styles/PetCard.css';
import { Link } from 'react-router-dom';
import coming_soon from "../images/coming_soon.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons';

import { API, graphqlOperation } from 'aws-amplify';
import { listUserPetFavorites } from '../graphql/queries';

const PetCard = ({ pet, favorited, handleToggleFavorite }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [imageSource, setImageSource] = useState(null);

  const handleMoreInfoClick = () => {
    console.log("inside handle")
    // Create the URL for the new window, including the 'petData' and 'favorited' query parameters
    const moreInfoUrl = `${process.env.PUBLIC_URL}/pet-details/${pet.id}?petData=${encodeURIComponent(JSON.stringify(pet))}&favorited=${isFavorited}`;
    console.log(moreInfoUrl, "URL IN PET CARD")
    
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

  // FUNCTION to fetch a random image of the type of animal and the breed in case the pet doesn't
  // have a photo. In case this fails, use our coming_soon photo.
  const fetchPlaceholderImage = async (type, breed) => {
    try {
      const response = await fetch(`https://source.unsplash.com/200x200/?${type},${breed}`);
      if (response.ok) {
        return response.url;
      }
      // Return the placeholder image if the request fails
      return coming_soon;
    } catch (error) {
      console.error('Error fetching placeholder image:', error);
      // Return the placeholder image in case of an error
      return coming_soon;
    }
  };

  const fetchFavoriteState = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listUserPetFavorites));
      const userPetFavorites = response.data.listUserPetFavorites.items;

      // Check if the current pet is in the user's favorites
      const isPetFavorited = userPetFavorites.some(favorite => favorite.petId === String(pet.id));

      // Update the local state based on whether the pet is in the user's favorites
      setIsFavorited(isPetFavorited);
    } catch (error) {
      console.error('Error fetching favorite pets:', error);
    }
  };

  useEffect(() => {
    // Fetch and set the initial favorite state when the component mounts
    fetchFavoriteState();
  }, [pet]);

  useEffect(() => {
    const fetchImage = async () => {
      // if the pet has at least 1 photo, set its image to one of its photos
      if (pet.photos && pet.photos.length > 0) {
        setImageSource({ url: pet.photos[0]?.medium, generated: false });
      } else {
        // if the pet doesnt have any photos, fetch an image based on type and breed
        const placeholderImage = await fetchPlaceholderImage(pet.type, pet.breeds.primary || pet.type, pet.breeds.secondary);
        // set the image and create a label to let users know it was generated
        setImageSource({ url: placeholderImage, generated: true });
      }
    };
    fetchImage();
  }, [pet]);
  
  const handleToggleFavoriteClick = () => {
    console.log("clicked heart toggle")
    handleToggleFavorite(pet); // Call the parent component function
    setIsFavorited((prevIsFavorited) => !prevIsFavorited); // Update the local state
  };

  return (
    <div className="pet-card">
      <Link
        to={`/pet-details/${pet.id}?petData=${encodeURIComponent(JSON.stringify(pet))}`}
        target="_blank"
        className="pet-card-link"
      >
        <div className="pet-card-image-container">
          {imageSource && imageSource.url && (
            <>
              <img src={imageSource.url} alt={pet.name} className="pet-card-image" />
              {imageSource.generated && <span className="overlay-text">Generated Image</span>}
            </>
          )}
        </div>
        <h4>
          {pet.name.length > 9 ? pet.name.substring(0, 9) + ' ...' : pet.name}{' '}
          <span role="img" aria-label="Location">
            📍{pet.contact.address.city.substring(0, 10)}, {pet.contact.address.state}
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
              : `${pet.description}`}
          </p>
        ) : (
          <p className="pet-card-description">This pet doesn't have a description.</p>
      )}
      </Link>
      <div className="pet-card-footer">
        <button className="more-info-button" onClick={handleMoreInfoClick}>
          More Info
        </button>
        <button
          className={`favorite-heart-${isFavorited? 'favorited' : 'unfavorited'}`}
          onClick={handleToggleFavoriteClick}
          tabIndex="0"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </div>
  );
};

export default PetCard;