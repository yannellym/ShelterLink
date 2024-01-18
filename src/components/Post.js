import React, { useState } from 'react';

const Post = ({ selectedTopic, user, onPostSubmit }) => {
  const [newSubject, setNewSubject] = useState('');
  const [newPost, setNewPost] = useState('');
    console.log(selectedTopic, "topic")
  const handlePostSubmit = () => {
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
    <div className="make-post-container">
      <h3>Topic: {selectedTopic.title}</h3>
      <div>
        <h4>Create a post:</h4>
        <div className="write-post-div">
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
                if (inputText.length <= 1000) {
                  setNewPost(inputText);
                }
              }}
              placeholder="Write your post..."
              className="post-textarea"
              maxLength={1000} // Set maximum length to 1000 characters
            />
            <div className="post-bottom-container">
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Character Count: {newPost.length} / 1000</p>
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

export default Post;
