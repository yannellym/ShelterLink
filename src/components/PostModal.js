import React, { useState } from 'react';
import '../styles/ShareModal.css';

const PostModal = ({ selectedTopic, user, onPostSubmit, onClose }) => {
  const [newSubject, setNewSubject] = useState('');
  const [newPost, setNewPost] = useState('');
  const [copied, setCopied] = useState(false);

  const handlePostSubmit = async () => {
    // Validate and submit the post
    if (user && newSubject && newPost) {
      const post = {
        subject: newSubject,
        content: newPost,
        user: user,
        topic: selectedTopic.title,
        date: new Date(),
      };

      // Pass the post to the parent component
      onPostSubmit(post);

      // Clear input fields after submitting
      setNewSubject('');
      setNewPost('');
    }
  };

  return (
    <div className="share-modal-overlay">
      <div className="share-modal-content">
        <div className="modal-header">
          <button onClick={onClose}>&times;</button>
        </div>
        <h1>Create a Post</h1>
        <div className="modal-body">
          <div className="post-input-container">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Subject"
              className="post-input"
            />
            <textarea
              value={newPost}
              onChange={(e) => {
                const inputText = e.target.value;
                setNewPost(inputText);
              }}
              placeholder="Write your post..."
              className="post-textarea"
            />
            <div className="post-bottom-container">
              <p>Date: {new Date().toLocaleDateString()}</p>
              <button
                onClick={handlePostSubmit}
                className={`post-button ${!user ? 'disabled' : ''}`}
                disabled={!user}
              >
                {user ? 'Post' : 'Sign in to post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
