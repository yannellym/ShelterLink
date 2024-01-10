// ShareModal.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import '../styles/ShareModal.css'; 

const ShareModal = ({ petData, url, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  return (
    <div className="share-modal-overlay">
      <div className="share-modal-content">
        <div className="modal-header">
          <button onClick={onClose}>&times;</button>
        </div>
        <h1>Thank you for sharing {petData.name}! </h1>
        <div className="modal-body">
          <img src={petData.photos[0].medium || petData.photos[0].large } alt={petData.name} className="pet-photo" />
          <p>Copy the link to share:</p>
          <div className="input-container">
            <input type="text" value={url} readOnly />
            <button onClick={handleCopyClick}>
              <FontAwesomeIcon icon={faCopy} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
