// SectionLink.js
import React from 'react';
import '../styles/SectionLink.css'; 

function SectionLink({ title, link }) {
  return (
    <div className="section-card" onClick={() => window.location.href = link}>
      <h3>{title}</h3>
    </div>
  );
}

export default SectionLink;
