import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Messages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart} from '@fortawesome/free-solid-svg-icons';

import { API, graphqlOperation } from 'aws-amplify';
import { listPostsByTopic} from '../graphql/queries.js';
import { onCreateTopic } from '../graphql/subscriptions.js';

const Messages = ({ topic , replies, hideReplyButton, hideIcons,  onReplySubmit, topicIndex, handleLike, fetchImage }) => {

  const [data, setData] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [isFavorited, setIsFavorited] = useState(Array(data.length).fill(false));

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateTopic, { topicID: topic?.id })).subscribe({
      next: ({ value }) => {
        const newData = value.data.onCreatePost;
        setData((prevData) => [newData, ...prevData]);
      },
      error: (error) => console.error('Subscription error:', error),
    });
  
    return () => subscription.unsubscribe();
  }, [topic]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (topic) {
          console.log(topic, "topic")
          const result = await API.graphql(graphqlOperation(listPostsByTopic, { topicID: topic.id }));
          const fetchedData = result.data.listPosts.items;
          setData(fetchedData);
        } else if (replies) {
          console.log(replies, "replies to check")
         
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

  const handleLikeClick = (dataIndex) => {
    console.log('Liked Data:', data[dataIndex]);
    console.log(topicIndex, dataIndex, 'indices');
    handleLike(topicIndex, dataIndex);
  };

    console.log(data, "all replies ")

  return (
    <div className="previous-posts-container">
      {data.map((post, index) => (
        <div className={`post-container ${expandedPosts.includes(index) ? 'expanded-message' : ''} `} key={post.id}>
          {index % 2 === 0 ? (
            // If index is even, align image to the left
            <>
              <img src={post.image} alt={post.subject} className="left-image" />
              <div className={`post ${index % 2 === 0 ? 'even' : 'odd'} ${expandedPosts.includes(index) ? 'expanded' : ''}`}>
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
                          onClick={() => handleLikeClick(index)}
                          className={`like-heart-${index ? 'favorited' : 'unfavorited'}`}
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
                          onClick={() => handleLikeClick(index)}
                          className={`like-heart-${index ? 'favorited' : 'unfavorited'}`}
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
