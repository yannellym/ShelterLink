// SkeletonCard.js
import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="adopted-animal-card skeleton grayed-out">
      <div className="adopted-label">Adopted ❤️ </div>
      <div className="image-container skeleton-image"></div>
      <div className="text-container">
        <p>Name: <span className="red-text skeleton-text"></span></p>
        <p>Adopted in 
          <span className="red-text skeleton-text"></span>, 
          <span className="red-text skeleton-text"></span>
          on 
          <span className="red-text skeleton-text"></span>
        </p>
      </div>
    </div>
  );
};

export default SkeletonCard;
