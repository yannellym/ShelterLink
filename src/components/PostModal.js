import React, { useState } from 'react';
import '../styles/PostModal.css';

const PostModal = ({ selectedTopic, user, onPostSubmit, onClose }) => {
  const [newSubject, setNewSubject] = useState('');
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = async () => {
    // Validate and submit the post
    if (!user) {
      alert('Please sign in to create a new post.');
      return;
    }

    if (!selectedTopic) {
      alert('Please select a topic before posting.');
      return;
    }

    const newPostData = {
      subject: newSubject,
      content: newPost,
      user: user.id, 
      username: user.username,
      topicID: selectedTopic.id,
      favorited: false,
      likes: 0,
      likedBy: [],
      replies: [],
      topicTitle: selectedTopic.title,
    };
    
    onPostSubmit(newPostData);

    // Clear input fields after submitting
    setNewSubject('');
    setNewPost('');

    // Close the modal
    onClose();
  };


  return (
    <div className="share-modal-overlay">
      <div className="share-modal-content">
        <div className="modal-header">
          <h1>Create a Post</h1>
          <button className="post-close-btn" onClick={onClose}>&times;</button>
        </div>
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
