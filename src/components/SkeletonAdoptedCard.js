// SkeletonCard.js
import React from 'react';
import '../styles/SkeletonAdoptedCard.css';


const SkeletonCard = () => {
  return (
    <div className="skeleton-animal-card">
      <div className="skeleton-label"></div>
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
    </div>
  );
};


export default SkeletonCard;
