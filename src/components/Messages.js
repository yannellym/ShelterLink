import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Messages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons';

import { API, graphqlOperation } from 'aws-amplify';
import { listPostsByTopic } from '../graphql/queries.js';
import { onCreateTopic } from '../graphql/subscriptions.js';

const Messages = ({ topic, replies, hideReplyButton, hideIcons, onReplySubmit, topicIndex, handleLike, fetchImage, user }) => {
  const [data, setData] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [isFavorited, setIsFavorited] = useState([]);
  const [newReplies, setNewReplies] = useState([]);

  const messagesEndRef = useRef(null);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateTopic, { topicID: topic?.id })).subscribe({
      next: ({ value }) => {
        const newData = value.data.onCreatePost;
        console.log('Received new data:', newData);
        setData((prevData) => {
          setNewReplies((prevNewReplies) => [...prevNewReplies, newData]);
          return [...prevData, newData];
        });
        setIsFavorited((prevIsFavorited) => [...prevIsFavorited, newData.likedBy?.includes(user?.id) || false]);
      },
      error: (error) => console.error('Subscription error:', error),
    });

    return () => subscription.unsubscribe();
  }, [topic, user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (topic) {
          const result = await API.graphql(graphqlOperation(listPostsByTopic, { topicID: topic.id }));
          const fetchedData = result.data.listPosts.items;

          const sortedData = fetchedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

          if (sortedData.length > 0) {
            setIsPinned(sortedData[0] || false);
          }
          setData(sortedData);
          setIsFavorited(sortedData.map((post) => post.likedBy?.includes(user?.id) || false));
        } else if (replies) {
          setData(replies);
          setIsFavorited(replies.map((post) => post.likedBy?.includes(user?.id) || false));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [topic, replies, user]);

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
    onReplySubmit(postId, newReplyData);
  };

  const handleReplyClick = ({ post }) => {
    window.location.href = `/replies/${post.id}`;
  };

  const handleLikeClick = async (postId) => {
    try {
      await handleLike(postId);

      setData((prevData) =>
        prevData.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: isFavorited[postId] ? post.likes - 1 : post.likes + 1,
              }
            : post
        )
      );

      setIsFavorited((prevIsFavorited) => {
        const newIsFavorited = [...prevIsFavorited];
        newIsFavorited[postId] = !prevIsFavorited[postId];
        return newIsFavorited;
      });
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      console.log("scrolling to bottom")
      const scrollHeight = messagesEndRef.current.scrollHeight;
      const stepHeight = 65; // higher value means scroll is faster
      let currentPosition = messagesEndRef.current.scrollTop;

      const scrollStep = () => {
        if (currentPosition < scrollHeight) {
          messagesEndRef.current.scrollTop = currentPosition + stepHeight;
          currentPosition += stepHeight;
          requestAnimationFrame(scrollStep);
        }
      };
      scrollStep();
    }
  };


  return (
    <div className="data-received-container">
      {data.length > 0 && (
        <div className={`post-container ${expandedPosts.includes(0) ? 'expanded-message' : ''} pinned-post`} key={data[0].id}>
          {/* Render the first post separately */}
          <div className={`post ${expandedPosts.includes(0) ? 'expanded' : ''} ${newReplies.includes(data[0]) ? 'new-reply' : ''}`}>
            <div className="post-content">
              <div className="post-header">
                {topic && <h4>{data[0].subject.toUpperCase()}</h4>}
                {isPinned && (
                  <span className="pin-icon">
                    📌 
                  </span>
                )}
              </div>
              <p className={`post-text ${expandedPosts.includes(0) ? 'expanded' : ''}`}>{data[0].content}</p>
              {data[0].content.length > 200 && (
                <span className="read-more" onClick={() => handleReadMore(0)}>
                  {expandedPosts.includes(0) ? 'Read less' : 'Read more'}
                </span>
              )}
              <div className="post-details">
                <p>
                  Posted by {data[0].username} on {new Date(data[0].createdAt).toLocaleDateString()} @{' '}
                  {new Date(data[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {!hideIcons && (
                  <p className="post-details-icon-p">
                    <Link to={`/replies/${data[0].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {data[0].replies?.length || 0}{' '}
                      <FontAwesomeIcon icon={faCommentDots} className="reply-count-icon" />
                    </Link>
                    {data[0].likes}
                    <FontAwesomeIcon
                      icon={faHeart}
                      onClick={() => handleLikeClick(data[0].id)}
                      className={`like-heart-${isFavorited[data[0].id] ? 'favorited' : 'unfavorited'}`}
                    />
                  </p>
                )}
              </div>
              {!hideReplyButton && (
                <Link to={`/replies/${data[0].id}`}>
                  <button className="reply-button" onClick={() => handleReplyClick({ post: data[0], handleReplySubmit })}>
                    Reply
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="previous-posts-container" ref={messagesEndRef}>
        {data.slice(1).map((post, index) => (
          <div className={`post-container ${expandedPosts.includes(index + 1) ? 'expanded-message' : ''}`} key={post.id}>
            {index % 2 === 0 ? (
              // If index is even, align image to the left
              <>
                <img src={post.image} alt={post.subject} className="left-image" />
                <div className={`post ${index % 2 === 0 ? 'even' : 'odd'} ${expandedPosts.includes(index + 1) ? 'expanded' : ''} ${newReplies.includes(post) ? 'new-reply' : ''}`}>
                  <div className="post-content">
                    {topic && <h4>{post.subject.toUpperCase()}</h4>}
                    <p className={`post-text ${expandedPosts.includes(index + 1) ? 'expanded' : ''}`}>{post.content}</p>
                    {post.content.length > 200 && (
                      <span className="read-more" onClick={() => handleReadMore(index + 1)}>
                        {expandedPosts.includes(index + 1) ? 'Read less' : 'Read more'}
                      </span>
                    )}
                    <div className="post-details">
                      <p>
                        Posted by {post.username} on {new Date(post.createdAt).toLocaleDateString()} @{' '}
                        {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {!hideIcons && (
                        <p className="post-details-icon-p">
                          <Link to={`/replies/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {post.replies?.length || 0}{' '}
                            <FontAwesomeIcon icon={faCommentDots} className="reply-count-icon" />
                          </Link>
                          {post.likes}
                          <FontAwesomeIcon
                            icon={faHeart}
                            onClick={() => handleLikeClick(post.id)}
                            className={`like-heart-${isFavorited[post.id] ? 'favorited' : 'unfavorited'}`}
                          />
                        </p>
                      )}
                    </div>
                    {!hideReplyButton && (
                      <Link to={`/replies/${post.id}`}>
                        <button className="reply-button" onClick={() => handleReplyClick({ post: post, handleReplySubmit })}>
                          Reply
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </>
            ) : (
              // If index is odd, align image to the right
              <>
                <div className={`post ${index % 2 === 0 ? 'even' : 'odd'} ${expandedPosts.includes(index + 1) ? 'expanded' : ''} `}>
                  <div className="post-content">
                    {topic && <h4>{post.subject.toUpperCase()}</h4>}
                    <p className={`post-text ${expandedPosts.includes(index + 1) ? 'expanded' : ''}`}>{post.content}</p>
                    {post.content.length > 200 && (
                      <span className="read-more" onClick={() => handleReadMore(index + 1)}>
                        {expandedPosts.includes(index + 1) ? 'Read less' : 'Read more'}
                      </span>
                    )}
                    <div className="post-details">
                      <p>
                        Posted by {post.username} on {new Date(post.createdAt).toLocaleDateString()} @{' '}
                        {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {!hideIcons && (
                        <p className="post-details-icon-p">
                          <Link to={`/replies/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {post.replies?.length || 0}{' '}
                            <FontAwesomeIcon icon={faCommentDots} className="reply-count-icon" />
                          </Link>
                          {post.likes}
                          <FontAwesomeIcon
                            icon={faHeart}
                            onClick={() => handleLikeClick(post.id)}
                            className={`like-heart-${isFavorited[post.id] ? 'favorited' : 'unfavorited'}`}
                          />
                        </p>
                      )}
                    </div>
                    {!hideReplyButton && (
                      <Link to={`/replies/${post.id}`}>
                        <button className="reply-button" onClick={() => handleReplyClick({ post: post, handleReplySubmit })}>
                          Reply
                        </button>
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
    </div>
  );
};

export default Messages;