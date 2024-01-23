import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Messages from '../components/Messages.js'; 
import ReplyPost from '../components/ReplyPost.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart} from '@fortawesome/free-solid-svg-icons';

import '../styles/Replies.css';

const Replies = ({ match, user }) => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [replies, setReplies] = useState([]);
    const fetchRepliesRef = useRef(false);
    const messagesContainerRef = useRef(null);

    // Retrieve post information from localStorage
    const storedPost = localStorage.getItem('replyPost');
    const post = storedPost ? JSON.parse(storedPost) : null;

    const [expandedPosts, setExpandedPosts] = useState([]);

    console.log(post, "ORG POST")

    useEffect(() => {
        if (post && post?.id && !fetchRepliesRef.current) {
            const fetchReplies = async () => {
                try {
                    // API call or data fetching logic
                    // const response = await fetch(`/api/replies/${postId}`);
                    // const data = await response.json();
                    // setReplies(data);

                    // dummy data
                    const dummyReplies = [
                        {
                            id: Date.now() + 1,
                            subject: 'Reply Subject 1', 
                            content: 'Reply 1',
                            user: { id: 2, username: 'JohnDoe' },
                            image: 'https://www.rd.com/wp-content/uploads/2020/11/GettyImages-758586901-scaled-e1606773458129.jpg', 
                        },
                        {
                            id: Date.now() + 1,
                            subject: 'Reply Subject 2', 
                            content: 'Reply 1',
                            user: { id: 3, username: 'JohnDoe' },
                            image: 'https://www.rd.com/wp-content/uploads/2020/11/GettyImages-758586901-scaled-e1606773458129.jpg', 
                        },
                        {
                            id: Date.now() + 1,
                            subject: 'Reply Subject 3', 
                            content: 'Reply 1',
                            user: { id: 4, username: 'JohnDoe' },
                            image: 'https://www.rd.com/wp-content/uploads/2020/11/GettyImages-758586901-scaled-e1606773458129.jpg', 
                        },
                        
                    ];
                    setReplies(dummyReplies);
                } catch (error) {
                    console.error('Error fetching replies:', error);
                }
            };

            fetchReplies();
            fetchRepliesRef.current = true;
        }
    }, [post, fetchRepliesRef.current]);

    // Function to add a new reply
    const addNewReply = (newReply) => {
        const updatedPost = {
            ...post,
            replies: post.replies + 1,
        };
    
        setReplies((prevReplies) => [...prevReplies, newReply]);
    
        // Update the post in local storage
        localStorage.setItem('replyPost', JSON.stringify(updatedPost));
        
        // Scroll to the latest added reply
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
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

    return (
        <div className="reply-container">
            <button onClick={() => navigate(-2)}>Back</button>
            <h3>Original Post ID: {post ? post.id : 'Undefined'}</h3>
            <div className={`post-container ${expandedPosts.includes(post.index) ? 'expanded-message' : ''}`} key={post.id}>
                {
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
                                    Posted by: {post.user.username} on {new Date(post.id).toLocaleDateString()} @{' '}
                                    {new Date(post.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <p className='post-details-icon-p'>
                                    {post.replies.length} <FontAwesomeIcon icon={faCommentDots} />
                                    0 <FontAwesomeIcon icon={faHeart} />
                                </p>
                            </div>
                        </div>
                    </>
                }
            </div>   
            <div className="reply-container-inside-div-one" ref={messagesContainerRef}>
                <Messages posts={replies} hideReplyButton={true} hideIcons={true} />
            </div>
            <div className="reply-container-inside-div-two">
                <ReplyPost user={user} onReplySubmit={addNewReply} />
            </div>
        </div>
    );
};

export default Replies;
