import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Messages from '../components/Messages'; 
import Post from '../components/Post.js';
import '../styles/Replies.css';

const Replies = ({ match, user }) => {
    const { postId } = useParams();
    const [replies, setReplies] = useState([]);
    const fetchRepliesRef = useRef(false);

    // Retrieve post information from localStorage
    const storedPost = localStorage.getItem('replyPost');
    const post = storedPost ? JSON.parse(storedPost) : null;

    // Retrieve handleReplySubmit function from localStorage
    const storedHandleReplySubmit = localStorage.getItem('handleReplySubmit');
    const handleReplySubmit = storedHandleReplySubmit ? eval('(' + storedHandleReplySubmit + ')') : null;

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
                            image: 'https://thumbs.dreamstime.com/b/new-burst-5707187.jpg', 
                        },
                        // ... other dummy replies
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
        setReplies((prevReplies) => [...prevReplies, newReply]);
    };

    return (
        <div className="reply-container">
            <h3>Replies for Post {post ? post.id : 'Undefined'}</h3>
            <div className="reply-container-inside-div-one">
                <Messages posts={replies} hideReplyButton={true} />
            </div>
            <div className="reply-container-inside-div-two">
                <Post user={user} onReplySubmit={addNewReply} />
            </div>

        </div>
    );
};

export default Replies;
