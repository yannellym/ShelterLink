// Forum.js

import React, { useState } from 'react';
import '../styles/Forum.css';

const Forum = () => {
  const topicsList = [
    'Adopt', 'Birds', 'Cats', 'Dogs', 'Foster', 'Help', 'Horses', 'Pet Sitter Needed',
    'Rants', 'Shelters', 'Success Stories', 'Toys', 'Training', 'Updates', 'Volunteer'
  ];

  const sortedTopics = topicsList.sort((a, b) => a.localeCompare(b));

  const [topics, setTopics] = useState(sortedTopics.map((topic, index) => ({
    id: index + 1,
    title: topic,
    posts: [{ id: Date.now(), content: `Welcome to the ${topic} forum! Feel free to share your thoughts.`, user: { id: 1, username: 'JohnDoe' } }]
  })));

  const [selectedTopic, setSelectedTopic] = useState({}); // Initialize with an empty object
  const [newPost, setNewPost] = useState('');

  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
  };

  const handlePostSubmit = () => {
    if (!selectedTopic) {
      alert('Please select a topic before posting.');
      return;
    }

    const newPostData = {
      id: Date.now(),
      content: newPost,
      user: { id: 1, username: 'JohnDoe' },
    };

    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === selectedTopic.id
          ? { ...topic, posts: [...topic.posts, newPostData] }
          : topic
      )
    );

    setNewPost('');
    // Simulate backend interaction:
    // backendService.createPost(selectedTopic.id, newPostData);
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
        {selectedTopic && (
          <div>
            <h3>Current topic: {selectedTopic.title}</h3>
            <div>
                <h1>Please post </h1>
                {selectedTopic.posts && selectedTopic.posts.map((post)  => (
                <div key={post.id} className="post">
                  <p>{post.content}</p>
                  <p>Posted by: {post.user.username}</p>
                </div>
              ))}
            </div>
            <div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Write your post..."
              />
              <button onClick={handlePostSubmit}>Post</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
