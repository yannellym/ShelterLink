import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/PetDetails.css';

const PetDetails = () => {
  const location = useLocation();
  const petData = location.state && location.state.petData;

  if (!petData) {
    return <p className="error-message">Error: Pet not found</p>;
  }

  return (
    <div className="pet-details">
        <div className="photos">
        <h3>Photos</h3>
        <div className="photo-grid">
            {petData.photos && petData.photos.map((photo, index) => (
            <img key={index} src={photo.medium} alt={`Photo ${index + 1}`} className="pet-photo" />
            ))}
        </div>
        </div>
      <h2 className="pet-name">{petData.name}</h2>
      <div className="pet-info">
        <div className="pet-info-section">
          <p><strong>Age:</strong> {petData.age}</p>
          <p><strong>Gender:</strong> {petData.gender}</p>
          <p><strong>Size:</strong> {petData.size}</p>
        </div>
        <div className="pet-info-section">
          <p><strong>Primary Breed:</strong> {petData.breeds.primary}</p>
          <p><strong>Secondary Breed:</strong> {petData.breeds.secondary}</p>
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
        <p><strong>Email:</strong> {petData.contact.email}</p>
        <p><strong>Phone:</strong> {petData.contact.phone}</p>
        <p><strong>Location:</strong> {petData.contact.address.city}, {petData.contact.address.state}</p>
        <p><strong>Address:</strong> {petData.contact.address.address1}</p>
      </div>
      <div className="petfinder-link">
        <a href={petData.url} target="_blank" rel="noopener noreferrer">
          View on Petfinder
        </a>
      </div>
    </div>
  );
};

export default PetDetails;
