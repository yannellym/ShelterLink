import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Messages.css';

const Messages = ({ posts, hideReplyButton,  onReplySubmit }) => {
  const [expandedPosts, setExpandedPosts] = useState([]);

  const handleReadMore = (index) => {
    setExpandedPosts((prevExpandedPosts) => {
      if (prevExpandedPosts.includes(index)) {
        return prevExpandedPosts.filter((item) => item !== index);
      } else {
        return [...prevExpandedPosts, index];
      }
    });
  };
  const handleReplySubmit = (postId, newReplyData) => {
    // Pass the postId and new reply data to the parent component
    onReplySubmit(postId, newReplyData);
  };
  const handleReplyClick = ({post}) => {
     // Store post information in localStorage
     localStorage.setItem('replyPost', JSON.stringify(post));
     localStorage.setItem('handleReplySubmit', handleReplySubmit.toString());
 
     // Navigate to the Replies component
     window.location.href = `/replies/${post.id}`;
  };

  return (
    <div className="previous-posts-container">
      {posts.map((post, index) => (
        <div className={`post-container ${expandedPosts.includes(index) ? 'expanded-message' : ''}`} key={post.id}>
          {index % 2 === 0 ? (
            // If index is even, align image to the left
            <>
              <img src={post.image} alt={post.subject} className="left-image" />
              <div className={`post ${index % 2 === 0 ? 'even' : 'odd'} ${expandedPosts.includes(index) ? 'expanded' : ''}`}>
                <div className="post-content">
                  <h4>{post.subject.toUpperCase()}</h4>
                  <p className={`post-text ${expandedPosts.includes(index) ? 'expanded' : ''}`}>
                    {post.content}
                  </p>
                  {post.content.length > 200 && (
                    <span className="read-more" onClick={() => handleReadMore(index)}>
                      {expandedPosts.includes(index) ? 'Read less' : 'Read more'}
                    </span>
                  )}
                  <p>
                    Posted by: {post.user.username} on {new Date(post.id).toLocaleDateString()} @{' '}
                    {new Date(post.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {!hideReplyButton && (
                    <Link to={`/replies/${post.id}`}>
                      <button className="reply-button" onClick={() => handleReplyClick({ post, handleReplySubmit })}>Reply</button>
                    </Link>
                  )}
                </div>
              </div>
            </>
          ) : (
            // If index is odd, align image to the right
            <>
              <div className={`post ${index % 2 === 0 ? 'even' : 'odd'} ${expandedPosts.includes(index) ? 'expanded' : ''}`}>
                <div className="post-content">
                  <h4>{post.subject.toUpperCase()}</h4>
                  <p className={`post-text ${expandedPosts.includes(index) ? 'expanded' : ''}`}>
                    {post.content}
                  </p>
                  {post.content.length > 200 && (
                    <span className="read-more" onClick={() => handleReadMore(index)}>
                      {expandedPosts.includes(index) ? 'Read less' : 'Read more'}
                    </span>
                  )}
                  <p>
                    Posted by: {post.user.username} on {new Date(post.id).toLocaleDateString()} @{' '}
                    {new Date(post.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {!hideReplyButton && (
                    <Link to={`/replies/${post.id}`}>
                      <button className="reply-button" onClick={() => handleReplyClick({ post: post, handleReplySubmit })}>Reply</button>
                    </Link>
                  )}
                </div>
              </div>
              <img src={post.image} alt={post.subject} className="right-image" />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
