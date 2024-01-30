import React, { useState } from 'react';
import '../styles/ReplyPost.css';
import coming_soon from '../images/coming_soon.png';

const ReplyPost = ({ user, onReplySubmit }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = async () => {
    // Validate and submit the post
    if (!user) {
      alert('Please sign in to create a new post.');
      return;
    }
    // Fetch placeholder image for the selected topic
    const image = await fetchPlaceholderImage();
    console.log(user, "user inside creating post")

    const newReplyData = {
      content: replyContent,
      user: user.id,
      username: user.username,
      image: user.image,
    };

    // Pass the new reply data to the parent component
    onReplySubmit(newReplyData);

    // Clear input field after submitting
    setReplyContent('');
  };
  // FUNCTION to fetch a random image of the type of animal and the breed in case the pet doesn't
  // have a photo. In case this fails, use our coming_soon photo.
  const fetchPlaceholderImage = async () => {
    try {
      const response = await fetch(`https://source.unsplash.com/200x200/`);
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
    <div className="post-form">
      <h4>Write a Reply</h4>
      <textarea
        rows="4"
        cols="50"
        placeholder="Type your reply here..."
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
      ></textarea>
      <button 
        onClick={handleReplySubmit}
        className={`post-button ${!user ? 'disabled' : ''}`}
        >
          {user ? 'Submit Reply' : 'Sign in to reply'}
      </button>
    </div>
  );
};


export default ReplyPost;
