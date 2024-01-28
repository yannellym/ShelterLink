import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Messages from '../components/Messages.js'; 
import ReplyPost from '../components/ReplyPost.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

import { API, graphqlOperation } from 'aws-amplify';
import { getPost, getReply } from '../graphql/queries.js';
import { createReply, updatePost } from "../graphql/mutations.js";

import '../styles/Replies.css';

const Replies = ({ user, fetchImage }) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [replies, setReplies] = useState([]);
  const [post, setPost] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [showTopNewPostArrow, setShowTopNewPostArrow] = useState(false);
  const messagesContainerRef = useRef();

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        if (postId) {
          // Fetch post by ID
          const result = await API.graphql(
            graphqlOperation(getPost, { id: postId })
          );

          const post = result.data.getPost;
          setPost(post);

          // Extract reply IDs
          const replyIds = Array.isArray(post.replies)
            ? post.replies
            : post.replies.map(reply => reply.id);

          // Fetch details for each reply using getReply
          const fetchedReplies = await Promise.all(
            replyIds.map(async (replyId) => {
              const replyResult = await API.graphql(
                graphqlOperation(getReply, { id: replyId })
              );
              return replyResult.data.getReply;
            })
          );
          setReplies(fetchedReplies);
        }
      } catch (error) {
        console.error('Error fetching REPLIES:', error);
      }
    };

    fetchReplies();
  }, [postId]);

  const addNewReply = async (newReplyData) => {
    const image = await fetchImage();
    try {
      const input = {
        content: newReplyData.content,
        user: newReplyData.user,
        username: newReplyData.username,
        image,
      };

      const result = await API.graphql(graphqlOperation(createReply, { input }));
      const newReply = result.data.createReply;

      const updatedPostInput = {
        id: post.id,
        replies: [...post.replies, newReply.id],
      };

      await API.graphql(graphqlOperation(updatePost, { input: updatedPostInput }));

      setReplies([...replies, newReply]);
      setPost({ ...post, replies: updatedPostInput.replies });

      // Indicate that a new reply has been added
      setShowTopNewPostArrow(true);
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const handleReadMore = (index) => {
    setExpandedPosts((prevExpandedPosts) => {
      if (prevExpandedPosts.includes(index)) {
        return prevExpandedPosts.filter((item) => item !== index);
      } else {
        return [...prevExpandedPosts, index];
      }
    });
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const scrollHeight = messagesContainerRef.current.scrollHeight;
      const stepHeight = 85; // higher value means scroll is faster
      let currentPosition = messagesContainerRef.current.scrollTop;

      const scrollStep = () => {
        if (currentPosition < scrollHeight) {
          messagesContainerRef.current.scrollTop = currentPosition + stepHeight;
          currentPosition += stepHeight;
          requestAnimationFrame(scrollStep);
        }
      };

      scrollStep();
    }
  };

  return (
    <div className="reply-container">
      <button onClick={() => navigate(-2)}>Back</button>
      <h3>Original Post ID: {post && post.id ? post.id : 'Undefined'}</h3>
      {post && (
        <div className={`post-container ${expandedPosts.includes(post.id) ? 'expanded-message' : ''}`} key={post.id}>
          <>
            <img src={post.image} alt={post.subject} className="left-image" />
            <div className={`post ${expandedPosts.includes(post.index) ? 'expanded' : ''}`}>
              <div className="post-content">
                <h4>{post.subject.toUpperCase()}</h4>
                <p className={`post-text ${expandedPosts.includes(post.index) ? 'expanded' : ''}`}>
                  {post.content}
                </p>
                {post.content.length > 200 && (
                  <span className="read-more" onClick={() => handleReadMore(post.index)}>
                    {expandedPosts.includes(post.index) ? 'Read less' : 'Read more'}
                  </span>
                )}
                <p>
                  Posted by {post.username} on {new Date(post.createdAt).toLocaleDateString()} @{' '}
                  {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className='post-details-icon-p'>
                  {post.replies.length} <FontAwesomeIcon icon={faCommentDots} />
                  0 <FontAwesomeIcon icon={faHeart} />
                </p>
              </div>
            </div>
          </>
        </div>
      )}
      <div ref={messagesContainerRef} className="scrollable-container reply-container-inside-div-one">
        <Messages replies={replies} hideReplyButton={true} hideIcons={true} />
        {showTopNewPostArrow && (
            <div className="new-post-arrow" onClick={() => { setShowTopNewPostArrow(false); scrollToBottom(); }}>
                <FontAwesomeIcon icon={faCircleArrowDown} />
            </div>
            )}
      </div>
      <div className="reply-container-inside-div-two">
        <ReplyPost user={user} onReplySubmit={addNewReply} />
      </div>
    </div>
  );
};

export default Replies;
