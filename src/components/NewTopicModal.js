// NewTopicModal.js
import React, { useState } from 'react';
import '../styles/NewTopicModal.css';


const NewTopicModal = ({ onClose, onSubmit }) => {
  const [newTopicTitle, setNewTopicTitle] = useState('');

  const handleSubmit = () => {
    onSubmit(newTopicTitle);
    setNewTopicTitle('');
  };

  return (
    <div className="new-topic-modal-overlay">
        <div className="new-topic-modal">
            <button className="close-btn" onClick={onClose}>X</button>
            <h3>Create a New Topic</h3>
            <input
                type="text"
                placeholder="Enter Topic Title"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  );
};

export default NewTopicModal;
