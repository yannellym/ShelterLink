// card to display a detailed view of the pet's information
import React, { useState } from 'react';
import '../styles/PetDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import coming_soon from "../images/coming_soon.png";
import ShareModal from '../components/Sharemodal';

import { API, graphqlOperation } from 'aws-amplify';
import { listUserPetFavorites } from '../graphql/queries';

import EmailForm from '../components/EmailForm'; 

const PetDetails = ({  handleToggleFavorite, isAuthenticated, user }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleShareClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  const searchParams = new URLSearchParams(window.location.search);
 
  const petData = JSON.parse(decodeURIComponent(searchParams.get('petData')));
  console.log(petData, "PET DATA")

  const [isFavorited, setIsFavorited] = useState(false);
  
  if (!petData) {
    return <p className="error-message">Error: Pet not found</p>;
  }

  const handleFavoriteClick = () => {
    // Call the provided handleToggleFavorite function
    handleToggleFavorite(petData);
    setIsFavorited((prevIsFavorited) => !prevIsFavorited); // Update the local state
  };

  const fetchFavoriteState = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listUserPetFavorites));
      const userPetFavorites = response.data.listUserPetFavorites.items;

      // Check if the current pet is in the user's favorites
      const isPetFavorited = userPetFavorites.some(favorite => favorite.petId === String(petData.id));

      // Update the local state based on whether the pet is in the user's favorites
      setIsFavorited(isPetFavorited);
    } catch (error) {
      console.error('Error fetching favorite pets:', error);
    }
  };

  // Fetch and set the initial favorite state when the component mounts
  fetchFavoriteState();


  return (
    <div className="pet-details-container">
      {/* Left side with pet details */}
      <div className="pet-details">
        <button
          className={`favorite-heart-details-${isFavorited ? 'favorited' : 'unfavorited'}`}
          onClick={handleFavoriteClick}
          tabIndex="0"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <div className="photos">
          <div className="name-id-container">
            <h2 className="pet-name">{petData.name}</h2>
            <h4>Animal ID: {petData.id}</h4>
          </div>
          <div className="photo-grid">
          {petData.photos && petData.photos.length > 0 ? (
            petData.photos.map((photo, index) => (
              <img
                key={index}
                src={photo.medium}
                alt={`Pet ${index + 1}`}
                className={`pet-photo ${petData.photos.length === 1 ? 'single-photo' : ''}`}
              />
            ))
          ) : (
            <img
              src={coming_soon} 
              alt="Fallback"
              className="fallback-photo"
            />
          )}
          </div>
        </div>
      {/* Comment: dangerouslySetInnerHTML is used to replace innerHTML in React and should be used with care. */}
        <p dangerouslySetInnerHTML={{ __html: petData.description }}></p>
        <div className="petfinder-button">
          <a href={petData.url} target="_blank" rel="noopener noreferrer">
            <span> I want {petData.gender === "Female" ? "her" : "him"}! </span>
          </a>
        </div>
        <div className="pet-info">
          <div className="pet-info-section">
            <p><strong>Age:</strong> {petData.age ? petData.age : "Unknown"}</p>
            <p><strong>Gender:</strong> {petData.gender ? petData.gender : "Unknown"}</p>
            <p><strong>Size:</strong> {petData.size ? petData.size : "Unknown"}</p>
            <p><strong>Status:</strong> {petData.status ? petData.status : "Unknown"}</p>
          </div>
          <div className="pet-info-section">
            <p><strong>Primary Breed:</strong> {petData.breeds.primary ? petData.breeds.primary : "Unknown"}</p>
            <p><strong>Secondary Breed:</strong> {petData.breeds.secondary ? petData.breeds.secondary : "Unknown"}</p>
            <p><strong>Mixed:</strong> {petData.breeds.mixed ? 'Yes' : 'No'}</p>
          </div>
          <div className="pet-info-section">
            <p><strong>Spayed/Neutered:</strong> {petData.attributes.spayed_neutered ? 'Yes' : 'No'}</p>
            <p><strong>House Trained:</strong> {petData.attributes.house_trained ? 'Yes' : 'No'}</p>
            <p><strong>Special Needs:</strong> {petData.attributes.special_needs ? 'Yes' : 'No'}</p>
            <p><strong>Shots Current:</strong> {petData.attributes.shots_current ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> {petData.contact.email ? petData.contact.email : "Unknown"}</p>
          <p><strong>Phone:</strong> {petData.contact.phone ? petData.contact.phone : "Unknown"}</p>
          <p><strong>Location:</strong> 
            {petData.contact.address.address1} {petData.contact.address.city}, {petData.contact.address.state}
          </p>
        </div>
        {/* Share button */}
        <button onClick={handleShareClick} className="shareBtn">
          <FontAwesomeIcon icon={faShare} />
        </button>
        {/* Render the modal component conditionally */}
        {modalVisible && (
        <ShareModal onClose={handleCloseModal} url={petData.url} petData={petData} />
        )}
      </div>
      {/* Right side with email form and share button */}
      { isAuthenticated && // only show form if the user is authenticated
        <div className="side-panel">
          {/* Email Shelter form */}
          <EmailForm petData={petData} user={user} />
        </div>
      }
    </div>
  );
};

export default PetDetails;