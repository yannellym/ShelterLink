import React, { useState, useEffect } from 'react';
import '../styles/Forum.css';
import bd4 from '../images/bd4.jpeg';

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
          ? { ...topic, posts: [...topic.posts, newPostData] }
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
      return 'coming_soon;'
    } catch (error) {
      console.error('Error fetching placeholder image:', error);
      // Return the placeholder image in case of an error
      return 'coming_soon';
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
            <h3>Current topic: {selectedTopic.title}</h3>
            {selectedTopic.posts && selectedTopic.posts.length > 0 ? (
              <div>
                {selectedTopic.posts.map((post, index) => (
                  <div
                    key={post.id}
                    className={`post ${index % 2 === 0 ? 'even' : 'odd'}`}
                  >
                    <h4>{post.subject}</h4>
                    <p>{post.content}</p>
                    <p>Posted by: {post.user.username} | Date: {new Date(post.id).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>{selectedTopic.welcomeMessage}</p>
            )}
            <div className="write-post-div">
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Subject"
              />
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Write your post..."
              />
              <button onClick={handlePostSubmit}>Post</button>
            </div>

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
                            <p>{post.content}</p>
                            <p>Posted by: {post.user.username} on {new Date(post.id).toLocaleDateString()} @ {new Date(post.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                        </>
                    ) : ( // If index is odd, align image to the right
                        <>
                        <div className={`post ${index % 2 === 0 ? 'even' : 'odd'}`}>
                            <div className="post-content">
                            <h4>{post.subject.toUpperCase()}</h4>
                            <p>{post.content}</p>
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
        ) : (
          <div className="welcome-div">
            <h1> Welcome to our community forums! <br/> Please select a topic to join the discussion. </h1>
            <img src={bd4} alt="bulldog" className="centered-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
