import React, { useState, useEffect } from 'react';
import '../styles/Forum.css';
import bd4 from '../images/bd4.jpeg';
import Messages from '../components/Messages.js';
import PostModal from '../components/PostModal.js';

const Forum = ({user}) => {
  const [newSubject, setNewSubject] = useState('');
  const topicsList = [
    'Adopt', 'Birds', 'Cats', 'Dogs', 'Foster', 'Help', 'Horses', 'Pet Sitter Needed',
    'Rants', 'Shelters', 'Success Stories', 'Toys', 'Training', 'Updates', 'Volunteer'
  ];

  const sortedTopics = topicsList.sort((a, b) => a.localeCompare(b));
  const [selectedTopic, setSelectedTopic] = useState({});
  const [newPost, setNewPost] = useState('');
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedPosts, setSelectedPosts] = useState([]);
  // const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const [topics, setTopics] = useState(
    sortedTopics.map((topic, index) => ({
      id: index + 1,
      title: topic,
      posts: Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        subject: `Default Post ${i + 1} in ${topic}`,
        content: 'This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.This is the default content for the post.ThThis is the default content for the post.This is the default content for the post.ThThis is the default content for the post.This is the default content for the post.ThThis is the default content for the post.This is the default content for the post.ThThis is the default content for the post.This is the default content for the post.ThThis is the default content for the post.This is the default content for the post.ThThis is the default content for the post.This is the default content for the post.ThThis is the default content for the post.This is the default content for the post.ThThis is the default content for the post.This is the default content for the post.ThThis is the default content for the post.This is the default content for the post.Th',
        user: { id: 1, username: 'Admin' },
        image: 'https://thumbs.dreamstime.com/b/new-burst-5707187.jpg',
        replies: [], // Initialize replies as an empty array
      })),
    }))
  );


  // HANDLE TOPIC SELECTION
  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
  
    // Assuming each topic has a 'posts' property
    const selectedPosts = topics.find((t) => t.title === topic.title)?.posts || [];
    setSelectedPosts(selectedPosts);
    setSelectedThread(null); // Reset selected thread when a new topic is selected
  };

  // HANDLE NEW POSTS -> MODAL

  const handleNewPostClick = () => {
    setShowPostModal(true);
  };

  const handlePostModalClose = () => {
    setShowPostModal(false);
  };

  // HANDLE SUBMISSION OF POSTS
  const handlePostSubmit = async (newPostData) => {
    if (!user) {
      alert('Please sign in to create a new post.');
      return;
    }

    if (!selectedTopic) {
      alert('Please select a topic before posting.');
      return;
    }

    // Add the new post data to the selected topic's posts
    selectedTopic.posts = [newPostData, ...selectedTopic.posts];

    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.title === selectedTopic.title ? selectedTopic : topic
      )
    );

    // Reset expandedPosts to ensure the new post is visible
    setExpandedPosts([]);

    setNewSubject('');
    setNewPost('');
  };

  
  // UPDATE OF COMPONENT
  useEffect(() => {
    // Set welcome message when the component starts
    setSelectedTopic(null);
  }, []);

  useEffect(() => {
    setCharCount(newPost.length);
  }, [newPost]);

  
 

  return (
    <div className="forum-container">
      <div className="topics-list">
        <h2>Topics</h2>
        <div className="scrollable-list">
          {sortedTopics.map((topic) => (
            <div
              key={topic}
              onClick={() => handleTopicSelection({ title: topic, posts: topics.find(t => t.title === topic)?.posts })}
              className="indiv-topic"
            >
              {topic}
            </div>
          ))}
        </div>
        </div>
        {selectedTopic && selectedTopic.posts && (
        <div className="topic-posts-container">
          <button onClick={handleNewPostClick} className="new-post-btn">Make a new post</button>
          <h3>Current posts:</h3>
          <Messages posts={selectedTopic.posts} />
        </div>
        )}
        {/* New Post Modal */}
        {showPostModal && (
          <PostModal
            selectedTopic={selectedTopic}
            user={user}
            onPostSubmit={handlePostSubmit}
            onClose={handlePostModalClose}
            show={showPostModal}
         />)
        }
        {!selectedTopic && (
          <div className="welcome-div">
            <h1>Welcome to our community forums! <br /> Please select a topic to join the discussion.</h1>
            <img src={bd4} alt="bulldog" className="centered-image" />
          </div>
        )}
      </div>
    );
  };
export default Forum;
