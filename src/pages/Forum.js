import React, { useState, useEffect } from 'react';
import '../styles/Forum.css';
import bd4 from '../images/bd4.jpeg';
import Messages from '../components/Messages.js';
import PostModal from '../components/PostModal.js';
import NewTopicModal from '../components/NewTopicModal'; 


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faPlusCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Forum = ({ user }) => {
  const [newSubject, setNewSubject] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const topicsList = [
    'Adopt', 'Birds', 'Cats', 'Dogs', 'Foster', 'Help', 'Horses', 'Pet Sitter Needed',
    'Rants', 'Shelters', 'Success Stories', 'Toys', 'Training', 'Updates', 'Volunteer'
  ];

  const [selectedTopic, setSelectedTopic] = useState({});
  const [sortedTopics, setSortedTopics] = useState([...topicsList]);
  const [newPost, setNewPost] = useState('');
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const [selectedPosts, setSelectedPosts] = useState([]);

  const [showPostModal, setShowPostModal] = useState(false);
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);

  const [topics, setTopics] = useState(
    sortedTopics.map((topic, index) => ({
      id: index + 1,
      title: topic,
      posts: Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        subject: `Default Post ${i + 1} in ${topic}`,
        content: 'This is the default content for the post...',
        user: { id: 1, username: 'Admin' },
        image: 'https://clydevet.com.au/wp-content/uploads/2021/08/doggrin_SQR_blank.jpg',
        replies: [],
        likes: 0
      })),
    }))
  );

  // HANDLE TOPIC SELECTION
  const handleTopicSelection = (topic) => {
    const tIndex = sortedTopics.indexOf(topic.title);
    setSelectedTopic({ ...topic, tIndex });
    const selectedPosts = topics.find((t) => t.title === topic.title)?.posts || [];
    setSelectedPosts(selectedPosts);
  };

  // HANDLE NEW POSTS -> MODAL
  const handleNewPostClick = () => {
    setShowPostModal(true);
  };

  const handlePostModalClose = () => {
    setShowPostModal(false);
  };

  // HANDLE NEW TOPIC
const handleNewTopicSubmit = (title) => {
  if (!user) {
    alert('Please sign in to create a new topic.');
    return;
  }

  // Add the new topic to the topics list
  const newTopic = {
    id: Date.now(),
    title: title,
    posts: [], // New topic starts with an empty array of posts
  };

  console.log(newTopic, "new topic");

  if (!newTopic.title) {
    alert('Please enter a title for the new topic.');
    return;
  }

  console.log('New Topic Title:', newTopicTitle);
  console.log('Current Sorted Topics:', sortedTopics);

  // Update the sortedTopics array to reflect the new topic
  setSortedTopics((prevSortedTopics) => [...prevSortedTopics, title]);

  console.log('Updated Sorted Topics:', sortedTopics);

  setTopics((prevTopics) => [...prevTopics, newTopic]);

  // Sort the topics array based on the order in sortedTopics
  setTopics((prevTopics) =>
    prevTopics.sort((a, b) => sortedTopics.indexOf(a.title) - sortedTopics.indexOf(b.title))
  );

  console.log('Topics after adding new topic:', topics);

  // Reset input field
  setNewTopicTitle('');
  setShowNewTopicModal(false);

  console.log('New topic added');
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

  // HANDLE LIKES
  const handleLike = (tIndex, postIndex) => {
    console.log('inside handle like');

    if (!user) {
      alert('Please sign in to like a post.');
      return;
    }

    setTopics((prevTopics) => {
      const updatedTopics = [...prevTopics];

      const updatedPosts = updatedTopics[tIndex].posts.map((post, pIndex) => {
        if (pIndex === postIndex) {
          console.log('toggling');
          const updatedLikes = post.likes + 1;
          console.log('updatedLikes', updatedLikes);

          // Update the likes directly in the copied state
          return {
            ...post,
            likes: updatedLikes,
          };
        }
        return post;
      });

      // Update the copied state with the modified posts
      updatedTopics[tIndex] = {
        ...updatedTopics[tIndex],
        posts: updatedPosts,
      };

      // Set the selectedPosts state to trigger an immediate UI update
      setSelectedPosts(updatedPosts);

      return updatedTopics;
    });
  };

  const openNewTopicModal = () => {
    setShowNewTopicModal(true);
  };
  
  const closeNewTopicModal = () => {
    setShowNewTopicModal(false);
  };

  
  // UPDATE OF COMPONENT
  useEffect(() => {
    // Set welcome message when the component starts
    setSelectedTopic(null);
  }, []);

  useEffect(() => {
    setCharCount(newPost.length);
  }, [newPost]);

  useEffect(() => {
    // This effect will be triggered whenever the topics state changes
    console.log('Topics updated:', topics);
  }, [topics]);

  return (
    <div className="forum-container">
      <div className="topics-list">
        {/* New Topic Button Icon */}
        {user && (
          <div className="new-topic-button">
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="new-topic-icon"
              onClick={() => {
                setShowNewTopicModal(true);
              }}
            />
          </div>
        )}
        <h2>Topics</h2>
        <div className="scrollable-list">
          {sortedTopics.map((topic, index) => (
            <div
              key={topic}
              onClick={() => handleTopicSelection({ title: topic, posts: topics.find(t => t.title === topic)?.posts })}
              className="indiv-topic"
            >
              <span>{topic}</span>
              <span className="post-count">
                {topics.find(t => t.title === topic)?.posts.length}
                <FontAwesomeIcon
                  icon={faCommentDots}
                  className='messages-icon'
                />
              </span>
            </div>
          ))}
          {/* New Topic Modal */}
          {user && showNewTopicModal && (
            <NewTopicModal
              onClose={() => setShowNewTopicModal(false)}
              onSubmit={(title) => handleNewTopicSubmit(title)}
            />
          )}
        </div>
      </div>
      {selectedTopic && (
        <div className="topic-posts-container">
          {user && (
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={handleNewPostClick} 
              className={`new-post-btn ${!user ? 'disabled' : ''}`}
            >
              Make a new post
            </FontAwesomeIcon>
          )}
          {selectedTopic.posts && selectedTopic.posts.length > 0 ? (
            <>
              <h3>Current posts:</h3>
              <Messages
                posts={selectedTopic.posts}
                hideReplyButton={false}
                hideIcons={false}
                topicIndex={selectedTopic.tIndex}
                handleLike={(topicIndex, postIndex) => handleLike(topicIndex, postIndex)}
              />
            </>
          ) : (
            <div className="no-posts-message">
              <p>No posts yet. Be the first one to make a post!</p>
            </div>
          )}
        </div>
      )}
      {/* New Post Modal */}
      {user && showPostModal && (
        <PostModal
          selectedTopic={selectedTopic}
          user={user}
          onPostSubmit={handlePostSubmit}
          onClose={handlePostModalClose}
          show={showPostModal}
        />
      )}
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
