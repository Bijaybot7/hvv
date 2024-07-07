import React, { useState } from 'react';
import './Lesson.css';
import {  FaHeart, FaComment, FaTrash } from 'react-icons/fa';
function Lesson() {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [file, setFile] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [openComments, setOpenComments] = useState({}); // State to track which comments section is open

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() !== '') {
      const newPost = {
        id: posts.length + 1,
        content: postContent,
        file,
        likes: 0,
        comments: [],
      };

      setPosts([...posts, newPost]);
      setPostContent('');
      setFile(null);
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

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleDeleteComment = (postId, commentIndex) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.filter((_, index) => index !== commentIndex);
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleCommentSubmit = (postId) => {
    const comment = commentInputs[postId];
    if (comment && comment.trim() !== '') {
      handleComment(postId, comment);
      setCommentInputs({ ...commentInputs, [postId]: '' });
    }
  };

  // Function to toggle the comment section for a specific post
  const handleToggleComments = (postId) => {
    setOpenComments((prevState) => ({
        ...prevState,
        [postId]: !prevState[postId]
    }));
  };

  return (
   <div className='mix'>
    <div className='lesson-container'>
      <form className='post-form' onSubmit={handlePostSubmit}>
        <input
          type='text'
          placeholder='Description of the Lesson'
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <input type='file' accept='video/*' onChange={(e) => setFile(e.target.files[0])} />
        <button className='post-btn' type='submit'>
          Post
        </button>
      </form>
      {posts.map((post) => (
        <div key={post.id} className='post'>
          <div className='post-content'>
            <p>{post.content}</p>
            {post.file && (
              post.file.type.startsWith('image/') ? (
                <img src={URL.createObjectURL(post.file)} alt='Post' />
              ) : (
                <video controls src={URL.createObjectURL(post.file)} />
              )
            )}
          </div>
          <div className='post-footer'>
            <button onClick={() => handleLike(post.id)} className='like-btn'>
              <FaHeart /> {post.likes}
            </button>
            {/* Toggle the comment section visibility when the comment icon is clicked */}
            <button onClick={() => handleToggleComments(post.id)} className='comment-btn'>
              <FaComment /> {post.comments.length}
            </button>
            <button onClick={() => handleDeletePost(post.id)} className='delete-btn'>
              <FaTrash />
            </button>
          </div>
          {/* Render the comments section only if the post's ID matches the openComments state */}
          {openComments[post.id] && (
            <div className='comments'>
              {post.comments.map((comment, index) => (
                <div key={index} className='comment'>
                  <p>{comment}</p>
                  <button
                    className='delete-comment-btn'
                    onClick={() => handleDeleteComment(post.id, index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <div className='comment-input'>
                <input
                  type='text'
                  placeholder='Write a comment...'
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                />
                <button
                  className='post-comment-btn'
                  onClick={() => handleCommentSubmit(post.id)}
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    </div> 
  );
}

export default Lesson;
