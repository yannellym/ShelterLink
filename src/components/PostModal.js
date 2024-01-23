import React, { useState } from 'react';
import '../styles/PostModal.css';
import coming_soon from '../images/coming_soon.png';

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
    // Fetch placeholder image for the selected topic
    const image = await fetchPlaceholderImage(selectedTopic.title);

    const newPostData = {
      id: Date.now(),
      subject: newSubject,
      content: newPost,
      user: { id: user.id, username: user.attributes.name },
      image,
      replies: [],
    };

    // Pass the new post data to the parent component
    console.log(newPostData, "sending data");
    onPostSubmit(newPostData);

    // Clear input fields after submitting
    setNewSubject('');
    setNewPost('');
  };

   // FUNCTION to fetch a random image of the type of animal and the breed in case the pet doesn't
  // have a photo. In case this fails, use our coming_soon photo.
  const fetchPlaceholderImage = async () => {
    try {
      const response = await fetch(`https://source.unsplash.com/200x200/?${newSubject}`);
      if (response.ok) {
        console.log(response.url, "url")
        return response.url;
      }
      // Return the placeholder image if the request fails
      return coming_soon;
    } catch (error) {
      console.error('Error fetching placeholder image:', error);
      // Return the placeholder image in case of an error
      return {coming_soon};
    }
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
