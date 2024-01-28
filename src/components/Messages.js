import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Messages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart} from '@fortawesome/free-solid-svg-icons';

import { API, graphqlOperation } from 'aws-amplify';
import { listPostsByTopic} from '../graphql/queries.js';
import { onCreateTopic } from '../graphql/subscriptions.js';

const Messages = ({ topic , replies, hideReplyButton, hideIcons,  onReplySubmit, topicIndex, handleLike, fetchImage, user }) => {

  const [data, setData] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [isFavorited, setIsFavorited] = useState(data.map(post => post.likedBy?.includes(user.attributes.sub) || false));
  const [newReplies, setNewReplies] = useState([]);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateTopic, { topicID: topic?.id })).subscribe({
      next: ({ value }) => {
        const newData = value.data.onCreatePost;
        console.log('Received new data:', newData);
        setData((prevData) => {
          setNewReplies((prevNewReplies) => [newData, ...prevNewReplies]); // Add new reply to state
          return [newData, ...prevData];
        });
      },
      error: (error) => console.error('Subscription error:', error),
    });
  
    return () => subscription.unsubscribe();
  }, [topic]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (topic) {
          const result = await API.graphql(graphqlOperation(listPostsByTopic, { topicID: topic.id }));
          const fetchedData = result.data.listPosts.items;
          setData(fetchedData);
        } else if (replies) {
          setData(replies);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [topic, replies]);

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
      // Toggle the like status
      await handleLike(postId);
  
      // Update likes count in the data state
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
  
      // Update isFavorited state
      setIsFavorited((prevIsFavorited) => {
        const newIsFavorited = [...prevIsFavorited];
        newIsFavorited[postId] = !prevIsFavorited[postId];
        return newIsFavorited;
      });
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };
  

  return (
    <div className="previous-posts-container">
      {data.map((post, index) => (
        <div className={`post-container ${expandedPosts.includes(index) ? 'expanded-message' : ''} `} key={post.id}>
          {index % 2 === 0 ? (
            // If index is even, align image to the left
            <>
              <img src={post.image} alt={post.subject} className="left-image" />
              <div className={`post ${index % 2 === 0 ? 'even' : 'odd'} ${expandedPosts.includes(index) ? 'expanded' : ''}  ${newReplies.includes(post) ? 'new-reply' : ''}`}>
                <div className="post-content">
                  {topic &&
                    <h4>
                      {post.subject.toUpperCase()}
                    </h4>
                  }
                  <p className={`post-text ${expandedPosts.includes(index) ? 'expanded' : ''}`}>
                    {post.content}
                  </p>
                  {post.content.length > 200 && (
                    <span className="read-more" onClick={() => handleReadMore(index)}>
                      {expandedPosts.includes(index) ? 'Read less' : 'Read more'}
                    </span>
                  )}
                  <div className="post-details">
                    <p>
                      Posted by {post.username} on {new Date(post.createdAt).toLocaleDateString()} @{' '}
                      {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {!hideIcons && (
                      <p className='post-details-icon-p'>
                        <Link 
                        to={`/replies/${post.id}`} 
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {post.replies?.length || 0} <FontAwesomeIcon 
                            icon={faCommentDots}
                            className='reply-count-icon'
                          />
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
                        <button className="reply-button" onClick={() => handleReplyClick({ post: post, handleReplySubmit })}>Reply</button>
                    </Link>
                  )}
                </div>
              </div>
            </>
          ) : (
            // If index is odd, align image to the right
            <>
              <div className={`post ${index % 2 === 0 ? 'even' : 'odd'} ${expandedPosts.includes(index) ? 'expanded' : ''} `}>
                <div className="post-content">
                  {topic &&
                    <h4>
                      {post.subject.toUpperCase()}
                    </h4>
                  }
                  <p className={`post-text ${expandedPosts.includes(index) ? 'expanded' : ''}`}>
                    {post.content}
                  </p>
                  {post.content.length > 200 && (
                    <span className="read-more" onClick={() => handleReadMore(index)}>
                      {expandedPosts.includes(index) ? 'Read less' : 'Read more'}
                    </span>
                  )}
                  <div className="post-details">
                    <p>
                      Posted by {post.username} on {new Date(post.createdAt).toLocaleDateString()} @{' '}
                      {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {!hideIcons && (
                      <p className='post-details-icon-p'>
                        <Link 
                        to={`/replies/${post.id}`} 
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {post.replies?.length ||0} <FontAwesomeIcon 
                            icon={faCommentDots}
                            className='reply-count-icon'
                          />
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
