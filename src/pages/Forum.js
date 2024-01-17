import React, { useState, useEffect } from 'react';
import '../styles/Forum.css';
import bd4 from '../images/bd4.jpeg';
import coming_soon from '../images/coming_soon.png';

const Forum = () => {
  const [newSubject, setNewSubject] = useState('');
  const topicsList = [
    'Adopt', 'Birds', 'Cats', 'Dogs', 'Foster', 'Help', 'Horses', 'Pet Sitter Needed',
    'Rants', 'Shelters', 'Success Stories', 'Toys', 'Training', 'Updates', 'Volunteer'
  ];

  const sortedTopics = topicsList.sort((a, b) => a.localeCompare(b));

  const [topics, setTopics] = useState(sortedTopics.map((topic, index) => (
    {
      id: index + 1,
      title: topic,
      threads: Array.from({ length: 35 }, (_, i) => {
        const timestamp = new Date().toLocaleString()
        return {
          id: i + 1,
          title: `Thread ${i + 1}`,
          timestamp,
          posts: [{
            id: Date.now(),
            subject: `Welcome to ${topic} Thread ${i + 1}!`,
            content: 'Feel free to share your thoughts.',
            user: { id: 1, username: 'JohnDoe' },
            image: 'https://thumbs.dreamstime.com/b/new-burst-5707187.jpg'
          }]
        };
      }).map(thread => ({ ...thread, posts: [] })) // Ensure that posts is initialized as an array
    }
  )));
  

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newPost, setNewPost] = useState('');
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [creatingNewThread, setCreatingNewThread] = useState(false);

  const handleThreadSelection = (thread) => {
    setSelectedThread(thread);
  };

  const handleNewThread = () => {
    setShowNewThreadModal(true);
  };
  
  const handleCloseNewThreadModal = () => {
    setShowNewThreadModal(false);
  };
  
  const handleNewThreadSubmit = () => {
    // Validate if the newSubject is not empty
    if (!newSubject.trim()) {
      alert('Please enter a valid thread title.');
      return;
    }
  
    // Create a new thread with a creation timestamp
    const newThread = {
      id: Date.now(),
      title: newSubject,
      timestamp: new Date().toLocaleString(), // Add timestamp
      posts: [],
    };
  
    // Update the topics state with the new thread
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.title === selectedTopic.title
          ? {
              ...topic,
              threads: [newThread, ...topic.threads], // Insert new thread at the beginning
            }
          : topic
      )
    );
  
    // Close the modal
    setShowNewThreadModal(false);
  
    // Set the selected thread to the newly created one
    setSelectedThread(newThread);
  
    // Reset states
    setNewSubject('');
  };
  

  const handleReadMore = (index) => {
    setExpandedPosts((prevExpanded) => [...prevExpanded, index]);
  };

  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
    setSelectedThread(null); // Reset selected thread when a new topic is selected
  };
 
  const handlePostSubmit = async () => {
    if (!selectedThread) {
      alert('Please select a thread before posting.');
      return;
    }
  
    // Fetch placeholder image for the selected thread
    const image = await fetchPlaceholderImage(selectedThread.title);
  
    const newPostData = {
      id: Date.now(),
      subject: newSubject,
      content: newPost,
      user: { id: 1, username: 'JohnDoe' },
      image,
    };
  
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.title === selectedTopic.title
          ? {
              ...topic,
              threads: topic.threads.map((thread) =>
                thread.title === selectedThread.title
                  ? {
                      ...thread,
                      posts: [newPostData, ...thread.posts], // Prepend new post to existing posts
                    }
                  : thread
              ),
            }
          : topic
      )
    );
  
    // Set the selected thread to the one with the new post
    setSelectedThread((prevSelectedThread) => ({
      ...prevSelectedThread,
      posts: [newPostData, ...prevSelectedThread.posts],
    }));
  
    // Reset expandedPosts to ensure the new post is visible
    setExpandedPosts([]);
  
    setNewSubject('');
    setNewPost('');
  };
  

  useEffect(() => {
    // Set welcome message when the component starts
    setSelectedTopic(null);
  }, []);

  useEffect(() => {
    setCharCount(newPost.length);
  }, [newPost]);

  // FUNCTION to fetch a random image of the type of animal and the breed in case the pet doesn't
  // have a photo. In case this fails, use our coming_soon photo.
  const fetchPlaceholderImage = async () => {
    try {
      const response = await fetch(`https://source.unsplash.com/200x200/?${newSubject}`);
      if (response.ok) {
        console.log(response.url, "url")
        return response.url;
      }
      // Return the placeholder image if the request fails
      return coming_soon;
    } catch (error) {
      console.error('Error fetching placeholder image:', error);
      // Return the placeholder image in case of an error
      return {coming_soon};
    }
  };

  return (
    <div className="forum-container">
      <div className="topics-list">
        <h2>Topics</h2>
        <div className="scrollable-list">
          {sortedTopics.map((topic) => (
            <div
              key={topic}
              onClick={() => handleTopicSelection({ title: topic, threads: topics.find(t => t.title === topic)?.threads })}
              className="indiv-topic"
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
      {selectedTopic && !selectedThread && (
        <div className="thread-container">
          <div className="thread-header">
            <div>
              <h3>Selected topic: {selectedTopic.title}</h3>
              <p>Choose a discussion to participate</p>
            </div>
            {/* Button to create a new thread */}
            <button onClick={handleNewThread} className="new-thread-button">
              Create New Thread
            </button>
          </div>
          <div className="threads-list">
            {selectedTopic.threads && selectedTopic.threads.map((thread) => (
              <div
                key={thread.id}
                onClick={() => handleThreadSelection(thread)}
                className={`indiv-thread ${selectedThread === thread ? 'selected' : ''}`}
              >
                {thread.title}
                <p>Created on: {thread.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Thread Modal */}
      {showNewThreadModal && (
        <div className="modal">
          <div className="new-thread-container">
            <h3>Create a New Thread</h3>
            <input
              type="text"
              value={newSubject}
              onChange={(e) => {
                const inputText = e.target.value;
                if (inputText.length <= 100) {
                  setNewSubject(inputText);
                }
              }}
              maxLength={100} 
              placeholder="Thread Title"
              className="post-input"
            />
            <p>Character Count: {newSubject.length} / 100</p>
            <button onClick={handleNewThreadSubmit} className="post-thread-button">
              Create Thread
            </button>
            <button onClick={handleCloseNewThreadModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
      {selectedThread && (
        <div className="make-post-container">
          <h3> Topic: {selectedTopic.title}, {selectedThread.title}</h3>
          <div>
            <h4>Create a post:</h4>
            <div className="write-post-div">
              <div className="post-input-container">
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Subject"
                  className="post-input"
                />
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Write your post..."
                  className="post-textarea"
                />
                <div className="post-bottom-container">
                  <p>Date: {new Date().toLocaleDateString()}</p>
                  <p>Character Count: {charCount}</p>
                  <button onClick={handlePostSubmit} className="post-button">
                    Post
                  </button>
                </div>
              </div>
            </div>
            <div className="previous-posts-container">
              <h3>Current posts:</h3>
              {selectedThread.posts &&
                selectedThread.posts.map((post, index) => (
                  <div className="post-container" key={post.id}>
                    {index % 2 === 0 ? (
                      // If index is even, align image to the left
                      <>
                        <img src={post.image} alt={post.subject} className="left-image" />
                        <div className={`post ${index % 2 === 0 ? 'even' : 'odd'}`}>
                          <div className="post-content">
                            <h4>{post.subject.toUpperCase()}</h4>
                            <p>
                              {expandedPosts.includes(index) ? post.content : (
                                <>
                                  {post.content.length > 200 ? (
                                    <div>
                                      {post.content.substring(0, 200)} ...
                                      <span className="read-more" onClick={() => handleReadMore(index)}>
                                        Read more
                                      </span>
                                    </div>
                                  ) : (
                                    post.content
                                  )}
                                </>
                              )}
                            </p>
                            <p>
                              Posted by: {post.user.username} on {new Date(post.id).toLocaleDateString()} @{' '}
                              {new Date(post.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      // If index is odd, align image to the right
                      <>
                        <div className={`post ${index % 2 === 0 ? 'even' : 'odd'}`}>
                          <div className="post-content">
                            <h4>{post.subject.toUpperCase()}</h4>
                            <p>
                              {expandedPosts.includes(index) ? post.content : (
                                <>
                                  {post.content.length > 200 ? `${post.content.substring(0, 200)} ... ` : post.content}
                                  <span className="read-more" onClick={() => handleReadMore(index)}>
                                    Read more
                                  </span>
                                </>
                              )}
                            </p>
                            <p>
                              Posted by: {post.user.username} on {new Date(post.id).toLocaleDateString()} @{' '}
                              {new Date(post.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        <img src={post.image} alt={post.subject} className="right-image" />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!selectedTopic && !selectedThread && (
          <div className="welcome-div">
            <h1> Welcome to our community forums! <br /> Please select a topic to join the discussion. </h1>
            <img src={bd4} alt="bulldog" className="centered-image" />
          </div>
        )}
      </div>
    );
  };  

export default Forum;