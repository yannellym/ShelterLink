import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/PetDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import coming_soon from "../images/coming_soon.png";

const PetDetails = ({addToFavorites, removeFromFavorites, isFavorite}) => {
  const location = useLocation();
  const [favorited, setFavorited] = useState(isFavorite);

  // Extract the 'petData' from the query parameter in the URL
  const searchParams = new URLSearchParams(window.location.search);
  const petData = JSON.parse(decodeURIComponent(searchParams.get('petData')));

  console.log(petData);

  if (!petData) {
    return <p className="error-message">Error: Pet not found</p>;
  }

  const handleToggleFavorite = () => {
    setFavorited(!favorited);
    if (favorited) {
      removeFromFavorites(petData.id);
    } else {
      addToFavorites(petData);
    }
  };


  return (
    <div className="pet-details">
      <div className="back-link-container">
        <Link to="/find-a-pet" className="back-link">
          Go Back
        </Link>
      </div>
      <button
        className={`favorite-heart-${favorited ? 'favorited' : 'unfavorited'}`}
        onClick={handleToggleFavorite}
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
        )};
        </div>
      </div>
      <p>{petData.description}</p>
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
    </div>
  );
};

export default PetDetails;
