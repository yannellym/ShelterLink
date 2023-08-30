// SectionLink.js
import React from 'react';
import '../styles/SectionLink.css'; 

function SectionLink({ title, link, imageSrc }) {
  return (
    <div className="section-card" onClick={() => window.location.href = link}>
      <img src={imageSrc} alt='pet label' />
      <h3>{title}</h3>
    </div>
  );
}

export default SectionLink;
