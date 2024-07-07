import React, { useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import {
  FiCamera,
  FiThumbsUp,
  FiMessageCircle,
  FiTrash2,
  FiSearch
} from 'react-icons/fi';
import { RiHomeHeartFill } from 'react-icons/ri';
import { MdMessage } from 'react-icons/md';

const ProfilePage = () => {
  const [name, setName] = useState('Your Band Name');
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postDescription, setPostDescription] = useState('');
  const [postMedia, setPostMedia] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [vacancyType, setVacancyType] = useState('');
  const [vacancyExperience, setVacancyExperience] = useState('');
  const [vacancyDescription, setVacancyDescription] = useState('');
  const [vacancies, setVacancies] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setPostMedia(file);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handlePostSubmit = () => {
    if (postDescription.trim() !== '' || postMedia !== null) {
      const newPost = {
        id: Math.random().toString(36).substr(2, 9),
        description: postDescription,
        media: postMedia ? URL.createObjectURL(postMedia) : null,
        type: postMedia ? postMedia.type.split('/')[0] : null, // Add media type
        likes: 0,
        comments: []
      };
      setPosts([...posts, newPost]);
      setPostDescription('');
      setPostMedia(null);
    }
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleComment = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleCommentSubmit = (postId) => {
    if (commentInput.trim() !== '') {
      handleComment(postId, commentInput);
      setCommentInput('');
      setCommentingPostId(null);
    }
  };

  const handleCommentButtonClick = (postId) => {
    setCommentingPostId(postId);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleVacancySubmit = () => {
    if (vacancyType.trim() !== '' && vacancyDescription.trim() !== '') {
      const newVacancy = {
        id: Math.random().toString(36).substr(2, 9),
        bandName: name,
        type: vacancyType,
        experience: vacancyExperience,
        description: vacancyDescription
      };
      setVacancies([...vacancies, newVacancy]);
      setVacancyType('');
      setVacancyExperience('');
      setVacancyDescription('');
    }
  };

  const handleDeleteVacancy = (vacancyId) => {
    const updatedVacancies = vacancies.filter(
      (vacancy) => vacancy.id !== vacancyId
    );
    setVacancies(updatedVacancies);
  };

  const handleDeleteComment = (postId, commentIndex) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = [...post.comments];
        updatedComments.splice(commentIndex, 1);
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="front">
      <div className="page-container">
        <div className="home-message-icons">
          <Link to="/home">
            <RiHomeHeartFill className="home-icon" />
            </Link>
            <Link to="/message-section">
          <MdMessage className="message-icon" />
          </Link>
        </div>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-picture-container">
              <div className="profile-picture">
                {profilePicture ? (
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt="Profile"
                  />
                ) : (
                  <div className="default-profile-picture">
                    <FiCamera className="camera-icon" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="edit-profile">
              {isEditing ? (
                <div className="edit-profile-form">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Band Name"
                  />
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Contact Number"
                  />
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="Email Address"
                  />
                  <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value="">Select Genre</option>
                    <option value="rock">Rock</option>
                    <option value="pop">Pop</option>
                    <option value="jazz">Jazz</option>
                    <option value="metal">Metal</option>
                    <option value="hip-hop">Hip Hop</option>
                    <option value="others">Others</option>
                  </select>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  ></textarea>
                  <label htmlFor="edit-profile-picture" className="edit-profile-picture-label">
                    <FiCamera />
                    <input
                      id="edit-profile-picture"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                  </label>
                  <button className="save-button" onClick={handleSaveProfile}>Save</button>
                </div>
              ) : (
                <button className="edit-button" onClick={handleEditProfile}>Edit Profile</button>
              )}
            </div>
          </div>
          <div className="profile-info">
            <h1>{name}</h1>
            <p>Contact Number: {contactNumber}</p>
            <p>Email Address: {emailAddress}</p>
            <p>Genre: {genre}</p>
            <p>Description: {description}</p>
          </div>
        </div>
        <div className="post-container">
          <h2>Create Post</h2>
          <div className="post-input">
            <textarea
              placeholder="Write something..."
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
            />
            <label htmlFor="file-upload" className="file-upload-label">
              <FiCamera />
              <input
                id="file-upload"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
              />
            </label>
            {(postDescription.trim() !== '' || postMedia !== null) && <button onClick={handlePostSubmit}>Post</button>}
          </div>
          <div className="post-feed">
            {posts.map((post, index) => (
              <div key={index} className="post">
                {post.media && post.media.startsWith('blob:') ? (
                  post.type === 'image' ? (
                    <div className="image-wrapper">
                      <img src={post.media} alt="Post" className="post-image" />
                    </div>
                  ) : (
                    <div className="video-wrapper">
                      <video controls className="post-video">
                        <source src={post.media} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )
                ) : (
                  <p>{post.description}</p>
                )}
                <div className="post-actions">
                  <button onClick={() => handleLike(post.id)}>
                    <FiThumbsUp />
                    {post.likes} Likes
                  </button>
                  <button onClick={() => handleCommentButtonClick(post.id)}>
                    <FiMessageCircle />
                    {commentingPostId === post.id ? 'Cancel' : 'Comment'}
                  </button>
                </div>
                {commentingPostId === post.id && (
                  <div className="post-comments">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <button onClick={() => handleCommentSubmit(post.id)}>Post</button>
                  </div>
                )}
                <div className="post-comments">
                  {post.comments.map((comment, commentIndex) => (
                    <div key={commentIndex} className="comment">
                      <p>{comment}</p>
                      <div className="delete-comment" onClick={() => handleDeleteComment(post.id, commentIndex)}>
                        <FiTrash2 />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="delete-post" onClick={() => handleDeletePost(post.id)}>
                  <FiTrash2 />
                </div>
              </div>
            ))}
          </div>
          <div className="vacancy-container">
            <h2>Post a Vacancy</h2>
            <div className="vacancy-input">
              <select value={vacancyType} onChange={(e) => setVacancyType(e.target.value)}>
                <option value="">Select Vacancy Type</option>
                <option value="drummer">Drummer</option>
                <option value="guitarist">Guitarist</option>
                <option value="vocalist">Vocalist</option>
                <option value="pianist">Pianist</option>
                {/* Add more options as needed */}
              </select>
              <input
                type="text"
                placeholder="Experience (if any)"
                value={vacancyExperience}
                onChange={(e) => setVacancyExperience(e.target.value)}
              />
              <textarea
                placeholder="Description of the vacancy..."
                value={vacancyDescription}
                onChange={(e) => setVacancyDescription(e.target.value)}
              />
              {(vacancyType !== '' && vacancyDescription.trim() !== '') && (
                <button onClick={handleVacancySubmit}>Post Vacancy</button>
              )}
            </div>
            <div className="vacancy-list">
              <h2>Posted Vacancies</h2>
              {vacancies.map((vacancy, index) => (
                <div key={index} className="vacancy">
                  <p>Band: {vacancy.bandName}</p>
                  <p>Type: {vacancy.type}</p>
                  {vacancy.experience && <p>Experience Required: {vacancy.experience}</p>}
                  <p>Description: {vacancy.description}</p>
                  <div className="delete-vacancy" onClick={() => handleDeleteVacancy(vacancy.id)}>
                    <FiTrash2 />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
