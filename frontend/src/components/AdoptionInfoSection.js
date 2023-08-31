// AdoptionInfoSection.js
import React from 'react';

import '../styles/AdoptionInfoSection.css';

function AdoptionInfoSection() {
  return (
    <div className="adoption-info-section">
      <div className="adoption-info-card">
        <h3>Planning to Adopt a Pet?</h3>
        <p>Checklist for New Adopters</p>
        <p>Help make the transition as smooth as possible.</p>
        <a href="#" className="learn-more-link">LEARN MORE</a>
      </div>
      <div className="adoption-info-card">
        <h3>FAQs</h3>
        <p>Get answers to questions you haven't thought of.</p>
        <a href="#" className="learn-more-link">LEARN MORE</a>
      </div>
      <div className="adoption-info-card">
        <h3>Planning to foster a pet?</h3>
        <p>Checklist for New Adopters</p>
        <p>Help make the transition as smooth as possible.</p>
        <a href="#" className="learn-more-link">LEARN MORE</a>
      </div>
    </div>
  );
}

export default AdoptionInfoSection;
