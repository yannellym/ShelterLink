// resourcesInfoSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ResourcesSection.css';

/* component to display resources for the user
  parameters: 
  returns: 
*/
function ResourcesSection() {
  return (
    <div className="resources-info-section">
      <div className="resources-info-card">
        <h3>Planning to Adopt a Pet?</h3>
        <p>Help make the transition as smooth as possible.</p>
        <Link to="/pet-resources" className="learn-more-link">LEARN MORE</Link>
      </div>
      <div className="resources-info-card">
        <h3>FAQs</h3>
        <p>Get answers to questions you haven't thought of.</p>
        <Link to="/pet-faqs" className="learn-more-link">LEARN MORE</Link>
      </div>
      <div className="resources-info-card">
        <h3>Planning to foster a pet?</h3>
        <p>Help make the transition as smooth as possible.</p>
        <Link to="/pet-foster" className="learn-more-link">LEARN MORE</Link>
      </div>
    </div>
  );
}

export default ResourcesSection;
