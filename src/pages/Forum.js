import React, { useState, useEffect } from 'react';
import '../styles/Forum.css';
import bd4 from '../images/bd4.jpeg';
import Messages from '../components/Messages.js';
import PostModal from '../components/PostModal.js';
import NewTopicModal from '../components/NewTopicModal'; 

import { API, graphqlOperation } from 'aws-amplify';
import { createTopic, createPost, updateTopic } from '../graphql/mutations.js';
import { listTopics, getPost } from '../graphql/queries.js';
import { updatePost } from '../graphql/mutations.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faPlusCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Forum = ({ user, fetchImage }) => {

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

      // Sort the topics alphabetically based on the title
      const sortedTopics = fetchedTopics.sort((a, b) => a.title.localeCompare(b.title));

      setTopics(sortedTopics);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };
  
  // HANDLE TOPIC SELECTION
  const handleTopicSelection = (selectedTopic) => {
    // Find the index of the selected topic in the topics array
    const tIndex = topics.findIndex((t) => t.title === selectedTopic.title);
    
    // Set the selectedTopic state with additional 'tIndex' property
    setSelectedTopic({ ...selectedTopic, tIndex, id: topics[tIndex].id });

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

      // Call the function to add a default post for the new topic
      await addDefaultPostToTopic(newTopic);
      // Close the modal after submitting the new topic
      setShowNewTopicModal(false)

      // Update the selectedTopic state to the newly created topic
      setSelectedTopic(newTopic);
    } catch (error) {
      console.error('Error creating new topic:', error);
      console.log('Error details:', error.errors);
    }
  };

  // Function to add a default post for a given topic
  const addDefaultPostToTopic = async (topic) => {
    try {
      // Fetch placeholder image for the created post
      const image_url = await fetchImage();

      const postInput = {
        input: {
          subject: 'Welcome to the Forum!',
          content: `Hello forum members! 👋 Welcome to our ${topic.title} community. We're excited to have you here. Feel free to make posts, share your thoughts, like posts that resonate with you, and engage with other members by replying to their posts. Let's create a vibrant and supportive community together!`,
          user: user.id,
          username: user.username,
          topicID: topic.id,
          Favorited: false,
          likes: 0,
          image: user.image || image_url,
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

      // Sort the updated topics alphabetically based on the title
      const sortedTopics = updatedTopics.sort((a, b) => a.title.localeCompare(b.title));

      // Update the state with the sorted topics data
      setTopics(sortedTopics);

    } catch (error) {
      console.error('Error creating new post:', error);
    }
  };


  // HANDLE SUBMISSION OF POSTS
  const handlePostSubmit = async (newPostData) => {
    if (!user) {
      alert('Please sign in to create a new post.');
      return;
    }

    // Fetch placeholder image for the created post
    const image_url = await fetchImage();

    // Convert the new post data structure to match the existing structure
    const adaptedNewPostData = {
      input: {
        subject: newPostData.subject,
        content: newPostData.content,
        user: newPostData.user,
        username: newPostData.username,
        topicID: newPostData.topicID,
        Favorited: newPostData.favorited,
        likes: newPostData.likes,
        likedBy: newPostData.likedBy,
        replies: newPostData.replies,
        image: image_url,
      },
    };

    try {
      const result = await API.graphql(graphqlOperation(createPost, adaptedNewPostData));
    
      // post IDs from the topic
      const existingPostIds = selectedTopic.posts || [];

      // Update the existing topic's posts array by adding the new post's ID
      const updatedPostIds = [...existingPostIds, result.data.createPost.id];

      // Update the topic with the modified post array
      const resultOfTopicUpdate = await API.graphql({
        query: updateTopic,
        variables: {
          input: {
            id: newPostData.topicID,
            posts: updatedPostIds,
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

        // Sort the updated topics alphabetically based on the title
        const sortedTopics = updatedTopics.sort((a, b) => a.title.localeCompare(b.title));


        // Update the state with the sorted topics data
        setTopics(sortedTopics);
            
        // Update the selected topic with the new post
        setSelectedTopic((prevTopic) => ({
          ...prevTopic,
          posts: [result.data.createPost, ...(prevTopic.posts || [])], // Place the new post at the beginning
        }));
              
        setNewSubject('');
        setNewPost('');
      } catch (error) {
        console.error('Error creating new post:', error);
      }
    };

  // handle likes 
  const handleLike = async (postId) => {

    try {
      // Fetch the current post data
      const { data } = await API.graphql(graphqlOperation(getPost, { id: postId }));
      const post = data.getPost;

      // Check if the current user has already liked the post
      const userLiked = post.likedBy.includes(user.id);
  
      // Update the post with the new likes information
      const updatedPost = await API.graphql(graphqlOperation(updatePost, {
        input: {
          id: postId,
          likes: userLiked ? post.likes - 1 : post.likes + 1,
          likedBy: userLiked
            ? post.likedBy.filter((userId) => userId !== user.id)
            : [...post.likedBy, user.id],
        },
      }));

    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // HANDLE NEW POSTS -> MODAL
  const handleNewPostClick = () => {
    setShowPostModal(true);
  };

  const handlePostModalClose = () => {
    setShowPostModal(false);
  };


  // UPDATE OF COMPONENT
  useEffect(() => {
    // Set welcome message when the component starts
    setSelectedTopic(null);
  }, []);

  useEffect(() => {
    fetchTopics();
  }, []); // runs once when the component mounts

  console.log(user, "USER IN FORUM")
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
          {selectedTopic? (
            <>
              <h3>Current posts for {selectedTopic.title} :</h3>
              <Messages
                topic={selectedTopic}
                hideReplyButton={false}
                hideIcons={false}
                topicIndex={selectedTopic.tIndex}
                handleLike={(dataId) => handleLike(dataId)}
                fetchImage={fetchImage}
                user={user}
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
