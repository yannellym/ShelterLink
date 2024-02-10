import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Messages from '../components/Messages.js'; 
import ReplyPost from '../components/ReplyPost.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

import { API, graphqlOperation } from 'aws-amplify';
import { getPost, getReply } from '../graphql/queries.js';
import { createReply, updatePost } from "../graphql/mutations.js";

import kitten from "../images/kitten.jpg"
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
        replies: [...(post.replies || []), newReply.id],
      };
      
      await API.graphql(graphqlOperation(updatePost, { input: updatedPostInput }));

      setReplies([...replies, newReply]);
      setPost({ ...post, replies: updatedPostInput.replies });

      // Indicate that a new reply has been added
      setShowTopNewPostArrow(true);

      scrollToBottom();
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
      const stepHeight = 65; // higher value means scroll is faster
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
      <h3>Original Post:</h3>

      <div className={`reply-post-container ${expandedPosts.includes(post?.id) ? 'expanded-message' : ''} reply-org`} key={post?.id}>
        {post && (
          <>
            <img src={post.image} alt={post.subject} className="left-image" />
            <div className={`post ${expandedPosts.includes(post?.index) ? 'expanded' : ''}`}>
              <div className="reply-post-content">
                <h4>{post.subject.toUpperCase()}</h4>
                <p className={`post-text ${expandedPosts.includes(post?.index) ? 'expanded' : ''}`}>
                  {post.content}
                </p>
                {post.content.length > 200 && (
                  <span className="read-more" onClick={() => handleReadMore(post?.index)}>
                    {expandedPosts.includes(post?.index) ? 'Read less' : 'Read more'}
                  </span>
                )}
                <p>
                  Posted by {post.username} on {new Date(post.createdAt).toLocaleDateString()} @{' '}
                  {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className='reply-post-details-icon-p'>
                  {post && post.replies ? post.replies.length : 0} <FontAwesomeIcon icon={faCommentDots} />
                  0 <FontAwesomeIcon icon={faHeart} />
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="no-replies-message">
        {post && replies.length === 0 && (
          <>
            <p>No replies yet.</p>
            <img src={kitten} className="no-replies-yet" alt="no replies yet" />
          </>
        )}
      </div>

      {post && replies.length > 0 && (
        <div ref={messagesContainerRef} className="scrollable-container reply-container-inside-div-one">
          <Messages replies={replies} hideReplyButton={true} hideIcons={true} />
        </div>
      )}
      <div className="reply-container-inside-div-two">
        {post && (
          <ReplyPost user={user} onReplySubmit={addNewReply} />
        )}
      </div>
    </div>
  );
};

export default Replies;
