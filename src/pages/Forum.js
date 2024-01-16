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

  const [topics, setTopics] = useState(sortedTopics.map((topic, index) => ({
    id: index + 1,
    title: topic,
    posts: [{
      id: Date.now(),
      subject: `Welcome to the ${topic} forum!`,
      content: 'Feel free to share your thoughts.',
      user: { id: 1, username: 'JohnDoe' },
      image :'https://thumbs.dreamstime.com/b/new-burst-5707187.jpg'
    }]
  })));

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newPost, setNewPost] = useState('');
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [charCount, setCharCount] = useState(0);

  const handleReadMore = (index) => {
    setExpandedPosts((prevExpanded) => [...prevExpanded, index]);
  };

  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
  };

  const handlePostSubmit = async () => {
    if (!selectedTopic) {
      alert('Please select a topic before posting.');
      return;
    }
  
    // Fetch placeholder image for the selected topic
    const image = await fetchPlaceholderImage(selectedTopic.title);
  
    const newPostData = {
      id: Date.now(),
      subject: newSubject,
      content: newPost,
      user: { id: 1, username: 'JohnDoe' },
      image, // Assign the fetched image to the post
    };
  
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.title === selectedTopic.title
          ? {
              ...topic,
              posts: [newPostData, ...topic.posts], // Prepend new post to existing posts
            }
          : topic
      )
    );
  
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
            <div key={topic} onClick={() => handleTopicSelection({ title: topic })} className="indiv-topic">
              {topic}
            </div>
          ))}
        </div>
      </div>
      <div className="thread-container">
        {selectedTopic ? (
          <div>
          <h3>Current Thread: <text> {selectedTopic.title}</text></h3>
          {selectedTopic.posts && 
            <p>{selectedTopic.welcomeMessage}</p>
          }
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
            {topics.map((topic) => (
              <div key={topic.id}>
                {topic.title === selectedTopic.title &&
                  topic.posts && topic.posts.map((post, index) => (
                    <div className="post-container" key={post.id}>
                      {index % 2 === 0 ? ( // If index is even, align image to the left
                        <>
                          <img src={post.image} alt={post.subject} className="left-image" />
                          <div className={`post ${index % 2 === 0 ? 'even' : 'odd'}`}>
                            <div className="post-content">
                              <h4>{post.subject.toUpperCase()}</h4>
                              <p>
                                {expandedPosts.includes(index) ? post.content : (
                                  <>
                                    {post.content.length > 200 ?  // if post is longer than 200 chars, truncate it and display the "read more" button
                                      ( 
                                        <div>`${post.content.substring(0, 200)} ... `  
                                        <span className="read-more" onClick={() => handleReadMore(index)}>
                                          Read more
                                        </span>
                                        </div> 
                                      ) 
                                      : 
                                      post.content
                                    }
                                  </>
                                )}
                              </p>
                              <p>Posted by: {post.user.username} on {new Date(post.id).toLocaleDateString()} @ {new Date(post.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                          </div>
                        </>
                      ) : ( // If index is odd, align image to the right
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
                              <p>Posted by: {post.user.username} on {new Date(post.id).toLocaleDateString()} @ {new Date(post.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                          </div>
                          <img src={post.image} alt={post.subject} className="right-image" />
                        </>
                      )}
                    </div>
                  ))}
              </div>
            ))}
            </div>
          </div>
          ) : (
            <div className="welcome-div">
              <h1> Welcome to our community forums! <br/> Please select a topic to join the discussion. </h1>
              <img src={bd4} alt="bulldog" className="centered-image" />
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default Forum;