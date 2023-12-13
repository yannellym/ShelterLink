import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type-checking
import '../styles/NoLocationCard.css';

// card to display a message to the user to share their location or input zip code, if we don't have their location
const NoLocationCard = ({ onClick, message }) => (
  <div className="category-card">
    <div className="category-card-content">
      <h3>{message}</h3>
      <button onClick={onClick}>Provide Location</button>
    </div>
  </div>
);

// PropTypes for type-checking
NoLocationCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default NoLocationCard;
