import React from 'react';
import '../styles/Resources.css';

const Resources = () => {
  return (
    <div className="resources-container">
      <h2>Resources</h2>
      <div className="resource">
        <h3>Adoption Information</h3>
        <p>Learn about the adoption process and requirements.</p>
      </div>
      <div className="resource">
        <h3>Pet Care Tips</h3>
        <p>Get advice on caring for your new furry friend.</p>
      </div>
      <div className="resource">
        <h3>Local Shelters</h3>
        <p>Find shelters and rescues near you.</p>
      </div> 
    </div>
  );
};

export default Resources;
