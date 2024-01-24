import React, { useState, useEffect } from 'react';
import '../styles/Forum.css';
import bd4 from '../images/bd4.jpeg';
import default_pic from '../images/dandc.jpeg';
import Messages from '../components/Messages.js';
import PostModal from '../components/PostModal.js';
import NewTopicModal from '../components/NewTopicModal'; 

import { API, graphqlOperation } from 'aws-amplify';
import { createTopic, createPost, updateTopic } from '../graphql/mutations.js';
import { listTopics } from '../graphql/queries.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faPlusCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Forum = ({ user }) => {

  const [topics, setTopics] = useState([]);

  const [newSubject, setNewSubject] = useState('');

  const [selectedTopic, setSelectedTopic] = useState({});
  const [newPost, setNewPost] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);

  const [showPostModal, setShowPostModal] = useState(false);
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);

  // Function to fetch topics
  const fetchTopics = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listTopics));
      const fetchedTopics = result.data.listTopics.items;
      console.log(fetchedTopics, "topics fetched")
      setTopics(fetchedTopics);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };
  
  // HANDLE TOPIC SELECTION
  const handleTopicSelection = (selectedTopic) => {
    // Find the index of the selected topic in the topics array
    const tIndex = topics.findIndex((t) => t.title === selectedTopic.title);
    
    // Set the selectedTopic state with additional 'tIndex' property
    setSelectedTopic({ ...selectedTopic, tIndex });

    // Set the selectedPosts state with the posts of the selected topic
    const selectedPosts = selectedTopic.posts || [];
    setSelectedPosts(selectedPosts);
  };
  
  // Function to create a new topic
  const createNewTopic = async (title) => {
    try {
      const newTopicInput = {
        input: {
          title: title,
          posts : [],
        },
      };

      const result = await API.graphql(graphqlOperation(createTopic, newTopicInput));
      const newTopic = result.data.createTopic;

      console.log('New Topic:', newTopic);

      // Call the function to add a default post for the new topic
      await addDefaultPostToTopic(newTopic);
      // Close the modal after submitting the new topic
      setShowNewTopicModal(false)
      // Add logic to handle the created topic as needed
    } catch (error) {
      console.error('Error creating new topic:', error);
      console.log('Error details:', error.errors);
    }
  };

  // Function to add a default post for a given topic
  const addDefaultPostToTopic = async (topic) => {
    try {
      // Fetch placeholder image for the created post
      const image_url = await fetchPlaceholderImage(topic.title);

      const postInput = {
        input: {
          subject: 'Welcome to the Forum!',
          content: `Hello forum members! 👋 Welcome to our ${topic.title} community. We're excited to have you here. Feel free to make posts, share your thoughts, like posts that resonate with you, and engage with other members by replying to their posts. Let's create a vibrant and supportive community together!`,
          user: user.attributes.sub,
          username: user.attributes.name,
          topicID: topic.id,
          Favorited: false,
          likes: 0,
          image: image_url,
        },
      };

      const result = await API.graphql(graphqlOperation(createPost, postInput));
      console.log('Result:', result);

      // Update the topic to include the new post
      const resultOfTopicUpdate = await API.graphql({
        query: updateTopic,
        variables: {
          input: {
            id: topic.id,
            title: topic.title,
            posts: [result.data.createPost.id],
          },
        },
      });
      console.log('Result of updating topic:', resultOfTopicUpdate);
      
    // Fetch the updated topic data
    const updatedTopicResult = await API.graphql({
      query: listTopics,
      variables: {},
    });
    const updatedTopics = updatedTopicResult.data.listTopics.items;

    // Update the state with the new topics data
    setTopics(updatedTopics);

    } catch (error) {
      console.error('Error creating new post:', error);
    }
  };

  useEffect(() => {
    console.log("fetching topics....")
    fetchTopics();
  }, []); // runs once when the component mounts

  // HANDLE NEW POSTS -> MODAL
  const handleNewPostClick = () => {
    setShowPostModal(true);
  };

  const handlePostModalClose = () => {
    setShowPostModal(false);
  };
  
  // FUNCTION to fetch a random image for the post. In case this fails, use our default photo.
  const fetchPlaceholderImage = async () => {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=animal&client_id=CQnaHevzLsFIwELZJhaYpxdy5vmXqmYivIAZWlWMmd0`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(data.urls.small, "image url");
        return data.urls.small; 
      }
      
      // Return the placeholder image if the request fails
      return default_pic;
    } catch (error) {
      console.error('Error fetching placeholder image:', error);
      // Return the placeholder image in case of an error
      return default_pic;
    }
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

  // UPDATE OF COMPONENT
  useEffect(() => {
    // Set welcome message when the component starts
    setSelectedTopic(null);
  }, []);


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
          {topics && topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleTopicSelection({ title: topic.title, posts: topic.posts })}
              className="indiv-topic"
            >
              <span>{topic.title}</span>
              <span className="post-count">
                {topic.posts.length}
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
              onSubmit={(title) => createNewTopic(title)}
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
          {selectedPosts && selectedPosts.length > 0 ? (
            <>
              <h3>Current posts:</h3>
              <Messages
                postsIds={selectedPosts}
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
