import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMessengerLine } from "react-icons/ri";
import { FaRegUserCircle, FaSearch, FaHeart, FaComment, FaTrash } from "react-icons/fa";
import './ArtistHome.css';

const ArtistFeed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [postContent, setPostContent] = useState('');
  const [file, setFile] = useState(null);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() !== '') {
      const newPost = {
        content: postContent,
        file: file,
        likes: 0,
        comments: [],
        id: posts.length + 1 // Incrementing ID
      };
      setPosts([...posts, newPost]);
      setPostContent('');
      setFile(null); // Reset file state after submission
    }
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleComment = (postId, comment) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleDeleteComment = (postId, commentIndex) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.filter((comment, index) => index !== commentIndex);
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  // Handler for joining the band
  const handleJoinBand = () => {
    // Display an alert message to the user
    alert("Request sent to the band.");
  };

  return (
    <div className='middle'>
      <div className="feed-container">
        <div className="header">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="icons">
            <Link to="/artistprofile">
              <FaRegUserCircle className="user-icon" />
            </Link>
            <Link to="/artistmessage">
              <RiMessengerLine className="messenger-icon" />
            </Link>
          </div>
        </div>
        <div className="vacancy-container">
          <h2>Vacancy</h2>
          <div className="vacancy-details">
            <p><strong>Name:</strong> Albatross</p>
            <p><strong>Position:</strong> Drummer</p>
            <p><strong>Location:</strong> Lalitpur Patan</p>
            <p><strong>Experience:</strong> 2-3 years</p>
            <p><strong>Description:</strong> We need a drummer for our new Nepal tour. Feel free to contact us; we are looking for a young talent.</p>
            {/* Join button with an onClick event handler */}
            <button className="join-btn" onClick={handleJoinBand}>APPLY</button>
          </div>
        </div>

        <div className="posts-container">
          <h2 className="post-heading">Posts</h2>
          <form className="post-form" onSubmit={handlePostSubmit}>
            <input
              type="text"
              
              placeholder="Write something..."
              value={postContent}
              
              onChange={(e) => setPostContent(e.target.value)}

            />
            <input type="file" accept="image/*, video/*" onChange={(e) => setFile(e.target.files[0])} />
            
            <button type="submit" className="post-btn">Post</button>
            
          </form>
          {posts.map(post => (
            <div key={post.id} className="post">
              <FaRegUserCircle className="user-icon" />
              <p> <strong>Posted by Phoebe</strong> </p>
              <p>{post.content}</p>
              {post.file && (
                <div className="file-container">
                 
                  {post.file.type.includes('image') ? (
                    <img src={URL.createObjectURL(post.file)} alt="Uploaded Image" />
                  ) : (
                    <video controls>
                      <source src={URL.createObjectURL(post.file)} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
              <div className="post-interactions">
                <div className="like-comment">
                  <button className="like-btn" onClick={() => handleLike(post.id)}>
                    <FaHeart /> {post.likes}
                  </button>
                  <button className="comment-btn" onClick={() => handleComment(post.id, commentInput)}>
                    <FaComment /> {post.comments.length}
                  </button>
                </div>
                <div className="comments">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="comment">
                      <p>{comment}</p> 
                      <button className="delete-comment-btn" onClick={() => handleDeleteComment(post.id, index)}>
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
              </div>
              <button className="delete-post-btn" onClick={() => handleDeletePost(post.id)}>
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>       
  );
};

export default ArtistFeed;
