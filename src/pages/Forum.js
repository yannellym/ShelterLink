import React, { useState, useEffect } from 'react';
import '../styles/Forum.css';
import bd4 from '../images/bd4.jpeg';
import coming_soon from '../images/coming_soon.png';
import Messages from '../components/Messages.js';
import Post from '../components/Post.js';
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

  // const handleReplySubmit = (post) => {
  //   // Check if the reply content is not empty
  //   if (!newReply.trim()) {
  //     alert('Please enter a valid reply.');
  //     return;
  //   }
  
  //   // Create a new reply with a creation timestamp
  //   const replyData = {
  //     id: Date.now(),
  //     content: newReply,
  //     user: { id: 1, username: 'JohnDoe' },
  //   };
  
  //   // Update the selected topic's posts with the new reply
  //   setTopics((prevTopics) =>
  //     prevTopics.map((topic) =>
  //       topic.title === selectedTopic.title
  //         ? {
  //             ...topic,
  //             posts: topic.posts.map((p) =>
  //               p.id === post.id
  //                 ? {
  //                     ...p,
  //                     replies: [replyData, ...p.replies], // Insert new reply at the beginning
  //                   }
  //                 : p
  //             ),
  //           }
  //         : topic
  //     )
  //   );
  
  //   // Reset states
  //   setNewReply('');
  // };
  
  //
  

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
  const handlePostSubmit = async () => {
    if (!user) {
      alert('Please sign in to create a new post.');
      return;
    }
  
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
      image,
      replies: [], 
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

  //  New Thread Modal
  //     {showNewThreadModal && (
  //       <div className="modal">
  //         <div className="new-thread-container">
  //           <h3>Create a New Thread</h3>
  //           <input
  //             type="text"
  //             value={newSubject}
  //             onChange={(e) => {
  //               const inputText = e.target.value;
  //               if (inputText.length <= 100) {
  //                 setNewSubject(inputText);
  //               }
  //             }}
  //             maxLength={100} 
  //             placeholder="Thread Title"
  //             className="post-input"
  //           />
  //           <p>Character Count: {newSubject.length} / 100</p>
  //           <button onClick={handleNewThreadSubmit} className="post-thread-button">
  //             Create Thread
  //           </button>
  //           <button onClick={handleCloseNewThreadModal} className="close-button">
  //             Close
  //           </button>
  //         </div>
  //       </div>
  //     )}
  //     {selectedThread && (
  //       <div className="make-post-container">
  //         <h3> Topic: {selectedTopic.title}, {selectedThread.title}</h3>
  //         <div>
  //         <h4>Create a post:</h4>
  //           <div className="write-post-div">
  //             <div className="post-input-container">
  //               <input
  //                 type="text"
  //                 value={newSubject}
  //                 onChange={(e) => setNewSubject(e.target.value)}
  //                 placeholder="Subject"
  //                 className="post-input"
  //               />
  //               <textarea
  //                 value={newPost}
  //                 onChange={(e) => {
  //                   const inputText = e.target.value;
  //                   if (inputText.length <= 1000) {
  //                     setNewPost(inputText);
  //                   }
  //                 }}
  //                 placeholder="Write your post..."
  //                 className="post-textarea"
  //                 maxLength={1000} // Set maximum length to 1000 characters
  //               />
  //               <div className="post-bottom-container">
  //                 <p>Date: {new Date().toLocaleDateString()}</p>
  //                 <p>Character Count: {newPost.length} / 1000</p>
  //                 <button 
  //                   onClick={handlePostSubmit} 
  //                   className={`post-button ${!user ? 'disabled' : ''}`} 
  //                   disabled={!user} 
  //                   >
  //                   {user ? 'Post' : 'Sign in to post'} 
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="previous-posts-container">
  //             <h3>Current posts:</h3>
  //             {selectedThread.posts &&
  //               selectedThread.posts.map((post, index) => (
  //                 <div className="post-container" key={post.id}>
  //                   {index % 2 === 0 ? (
  //                     // If index is even, align image to the left
  //                     <>
  //                       <img src={post.image} alt={post.subject} className="left-image" />
  //                       <div className={`post ${index % 2 === 0 ? 'even' : 'odd'}`}>
  //                         <div className="post-content">
  //                           <h4>{post.subject.toUpperCase()}</h4>
  //                           <p>
  //                             {expandedPosts.includes(index) ? post.content : (
  //                               <>
  //                                 {post.content.length > 200 ? (
  //                                   <div>
  //                                     {post.content.substring(0, 200)} ...
  //                                     <span className="read-more" onClick={() => handleReadMore(index)}>
  //                                       Read more
  //                                     </span>
  //                                   </div>
  //                                 ) : (
  //                                   post.content
  //                                 )}
  //                               </>
  //                             )}
  //                           </p>
  //                           <p>
  //                             Posted by: {post.user.username} on {new Date(post.id).toLocaleDateString()} @{' '}
  //                             {new Date(post.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  //                           </p>
  //                         </div>
  //                       </div>
  //                     </>
  //                   ) : (
  //                     // If index is odd, align image to the right
  //                     <>
  //                       <div className={`post ${index % 2 === 0 ? 'even' : 'odd'}`}>
  //                         <div className="post-content">
  //                           <h4>{post.subject.toUpperCase()}</h4>
  //                           <p>
  //                             {expandedPosts.includes(index) ? post.content : (
  //                               <>
  //                                 {post.content.length > 200 ? `${post.content.substring(0, 200)} ... ` : post.content}
  //                                 <span className="read-more" onClick={() => handleReadMore(index)}>
  //                                   Read more
  //                                 </span>
  //                               </>
  //                             )}
  //                           </p>
  //                           <p>
  //                             Posted by: {post.user.username} on {new Date(post.id).toLocaleDateString()} @{' '}
  //                             {new Date(post.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  //                           </p>
  //                         </div>
  //                       </div>
  //                       <img src={post.image} alt={post.subject} className="right-image" />
  //                     </>
  //                   )}
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //       {!selectedTopic && !selectedThread && (
  //         <div className="welcome-div">
  //           <h1> Welcome to our community forums! <br /> Please select a topic to join the discussion. </h1>
  //           <img src={bd4} alt="bulldog" className="centered-image" />
  //         </div>
  //       )}*/}
  //     </div>
  //   ); 
  // };  
