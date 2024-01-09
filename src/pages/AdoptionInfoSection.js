// AdoptionInfoSection.js
import React from 'react';
import '../styles/AdoptionInfoSection.css';
import { useNavigate } from 'react-router-dom';

const AdoptionInfoSection = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="adoption-info-section">
      <div className="adoption-info-card">
        <h3>Planning to Adopt a Pet?</h3>
        <p>Help make the transition as smooth as possible.</p>
        <button onClick={() => handleNavigation('/pet-adoption')} className="learn-more-button">
          LEARN MORE
        </button>
      </div>
      <div className="adoption-info-card">
        <h3>FAQs</h3>
        <p>Get answers to questions you haven't thought of.</p>
        <button onClick={() => handleNavigation('/pet-faqs')} className="learn-more-button">
          LEARN MORE
        </button>
      </div>
      <div className="adoption-info-card">
        <h3>Planning to foster a pet?</h3>
        <p>Help make the transition as smooth as possible.</p>
        <button onClick={() => handleNavigation('/pet-foster')} className="learn-more-button">
          LEARN MORE
        </button>
      </div>
    </div>
  );
};


export default AdoptionInfoSection;
