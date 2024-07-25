import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { Link } from "react-router-dom";
import {
  FiCamera,
  FiThumbsUp,
  FiMessageCircle,
  FiTrash2,
  FiSearch,
} from "react-icons/fi";
import { FaRegUserCircle, FaSearch, FaTrash } from "react-icons/fa";

import { RiHomeHeartFill } from "react-icons/ri";
import { MdMessage } from "react-icons/md";

// Define API URLs
const API_URLS = {
  UPLOAD_FILE: "http://localhost:3030/upload",
  POST_VACANCY: "http://localhost:3030/vacancies",
  GET_VACANCIES: "http://localhost:3030/vacancies/user/",
  POST_POST: "http://localhost:3030/posts",
  GET_POSTS: "http://localhost:3030/posts/user/",
};

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [genre, setGenre] = useState("");
  const [band, setBand] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postDescription, setPostDescription] = useState("");
  const [postMedia, setPostMedia] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showVacancyForm, setShowVacancyForm] = useState(false);
  const [vacancyBandName, setVacancyBandName] = useState("");
  const [vacancyPosition, setVacancyPosition] = useState("");
  const [vacancyLocation, setVacancyLocation] = useState("");
  const [vacancyExperience, setVacancyExperience] = useState("");
  const [vacancyDescription, setVacancyDescription] = useState("");
  const [showPostedVacancies, setShowPostedVacancies] = useState(false);
  const [postedVacancies, setPostedVacancies] = useState([]);

  // Fetch user data and posts on mount
  useEffect(() => {
    const fetchUserDataAndPosts = async () => {
      const userId = JSON.parse(localStorage.getItem("user"))?.userId;
      if (userId) {
        try {
          // Fetch user data
          const userResponse = await axios.get(
            `http://localhost:3030/users/${userId}`
          );
          const userData = userResponse.data;
          setName(userData.name);
          setContactNumber(userData.contact || "");
          setEmailAddress(userData.email || "");
          setGenre(userData.genre || "");
          setDescription(userData.description || "");
          setBand(userData.band || "");

          // Fetch user's posts
          const postsResponse = await axios.get(
            `http://localhost:3030/posts/user/${userId}`
          );
          setPosts(postsResponse.data);
        } catch (error) {
          console.error("Error fetching user data or posts:", error);
        }
      }
    };

    fetchUserDataAndPosts();
  }, []);
  const fetchPostedVacancies = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.userId;
    if (userId) {
      try {
        const response = await axios.get(`${API_URLS.GET_VACANCIES}${userId}`);
        setPostedVacancies(response.data);
      } catch (error) {
        console.error("Error fetching posted vacancies:", error);
      }
    }
  };

  useEffect(() => {
    fetchPostedVacancies();
    // Existing fetchPosts() call here if you have it
  }, []);
  const handleVacancySubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user"))?.userId;

    if (
      vacancyBandName &&
      vacancyPosition &&
      vacancyLocation &&
      vacancyExperience &&
      vacancyDescription
    ) {
      try {
        const response = await axios.post(API_URLS.POST_VACANCY, {
          bandName: vacancyBandName,
          position: vacancyPosition,
          location: vacancyLocation,
          experience: vacancyExperience,
          description: vacancyDescription,
          userId,
        });

        if (response.status === 201) {
          await fetchPostedVacancies();
          setVacancyBandName("");
          setVacancyPosition("");
          setVacancyLocation("");
          setVacancyExperience("");
          setVacancyDescription("");
          setShowVacancyForm(false);
        } else {
          console.error("Failed to post vacancy:", response.statusText);
        }
      } catch (error) {
        console.error("Error posting vacancy:", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };
  const handleDeleteVacancy = async (id) => {
    try {
      await axios.delete(`${API_URLS.POST_VACANCY}/${id}`);
      setPostedVacancies(
        postedVacancies.filter((vacancy) => vacancy.id !== id)
      );
    } catch (error) {
      console.error("Error deleting vacancy:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setPostMedia(file);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.userId;
    if (userId) {
      try {
        await axios.put(`http://localhost:3030/users/details/${userId}`, {
          contact: contactNumber,
          genre: genre,
          description: description,
        });
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user"))?.userId;
    if (userId && (postDescription.trim() !== "" || postMedia !== null)) {
      try {
        let imagePath = "";
        let videoPath = "";

        if (postMedia) {
          const formData = new FormData();
          formData.append("files", postMedia);
          const uploadResponse = await axios.post(
            API_URLS.UPLOAD_FILE,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          const filePath = uploadResponse.data.paths[0];
          if (postMedia.type.startsWith("image/")) {
            imagePath = filePath;
          } else if (postMedia.type.startsWith("video/")) {
            videoPath = filePath;
          }
        }

        const response = await axios.post(API_URLS.POST_POST, {
          name: "Post",
          description: postDescription,
          userId,
          image: imagePath,
          video: videoPath,
        });

        if (response.status === 201) {
          setPosts([{ ...response.data, type: "post" }, ...posts]);
          setPostDescription("");
          setPostMedia(null);
        } else {
          console.error("Failed to create post:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3030/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
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
                  <div className="default-profile-picture"></div>
                )}
              </div>
            </div>
            <div className="edit-profile">
              {isEditing ? (
                <div className="edit-profile-form">
                  <input type="text" value={name} disabled placeholder="Name" />
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Contact Number"
                  />
                  <input
                    type="email"
                    value={emailAddress}
                    disabled
                    placeholder="Email Address"
                  />
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    <option value="">Select Genre</option>
                    <option value="rock">Rock</option>
                    <option value="pop">Pop</option>
                    <option value="jazz">Jazz</option>
                    <option value="metal">Metal</option>
                    <option value="indie">Indie</option>
                    <option value="hip-hop">Hip Hop</option>
                    <option value="others">Others</option>
                  </select>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  ></textarea>
                  <label
                    htmlFor="edit-profile-picture"
                    className="edit-profile-picture-label"
                  ></label>
                  <button className="save-button" onClick={handleSaveProfile}>
                    Save
                  </button>
                </div>
              ) : (
                <button className="edit-button" onClick={handleEditProfile}>
                  Edit Profile
                </button>
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
        <div className="vacancy-container">
          {showVacancyForm ? (
            <form className="vacancy-form" onSubmit={handleVacancySubmit}>
              <div className="form-group">
                <label htmlFor="vacancyBandName">Band Name</label>
                <input
                  type="text"
                  id="vacancyBandName"
                  value={vacancyBandName}
                  onChange={(e) => setVacancyBandName(e.target.value)}
                  placeholder="Enter band name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="vacancyPosition">Position</label>
                <input
                  type="text"
                  id="vacancyPosition"
                  value={vacancyPosition}
                  onChange={(e) => setVacancyPosition(e.target.value)}
                  placeholder="Enter position"
                />
              </div>
              <div className="form-group">
                <label htmlFor="vacancyLocation">Location</label>
                <input
                  type="text"
                  id="vacancyLocation"
                  value={vacancyLocation}
                  onChange={(e) => setVacancyLocation(e.target.value)}
                  placeholder="Enter location"
                />
              </div>
              <div className="form-group">
                <label htmlFor="vacancyExperience">Experience</label>
                <input
                  type="text"
                  id="vacancyExperience"
                  value={vacancyExperience}
                  onChange={(e) => setVacancyExperience(e.target.value)}
                  placeholder="Enter experience"
                />
              </div>
              <div className="form-group">
                <label htmlFor="vacancyDescription">Description</label>
                <textarea
                  id="vacancyDescription"
                  value={vacancyDescription}
                  onChange={(e) => setVacancyDescription(e.target.value)}
                  placeholder="Enter description"
                />
              </div>
              <button type="submit">Post Vacancy</button>
              <button type="button" onClick={() => setShowVacancyForm(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <button onClick={() => setShowVacancyForm(true)}>
              Post a Vacancy
            </button>
          )}

          <button
            className="toggle-posted-vacancies"
            onClick={() => setShowPostedVacancies(!showPostedVacancies)}
          >
            {showPostedVacancies
              ? "Hide Posted Vacancies"
              : "Show Posted Vacancies"}
          </button>

          {showPostedVacancies && (
            <div className="posted-vacancies">
              {postedVacancies.length > 0 ? (
                postedVacancies.map((vacancy) => (
                  <div key={vacancy.id} className="vacancy-card">
                    <div className="vacancy-header">
                      <h3>{vacancy.bandName}</h3>
                      <button
                        className="delete-vacancy-btn"
                        onClick={() => handleDeleteVacancy(vacancy._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <p>
                      <strong>Position:</strong> {vacancy.position}
                    </p>
                    <p>
                      <strong>Location:</strong> {vacancy.location}
                    </p>
                    <p>
                      <strong>Experience:</strong> {vacancy.experience}
                    </p>
                    <p>
                      <strong>Description:</strong> {vacancy.description}
                    </p>
                  </div>
                ))
              ) : (
                <p>No vacancies posted yet.</p>
              )}
            </div>
          )}
        </div>
        <div className="post-container">
          <h2>Create Post</h2>
          <form onSubmit={handlePostSubmit}>
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
              {(postDescription.trim() !== "" || postMedia !== null) && (
                <button type="submit">Post</button>
              )}
            </div>
          </form>
          <div className="post-feed">
            {posts.map((post, index) => (
              <div key={index} className="post">
                {post.image && (
                  <div className="image-wrapper">
                    <img src={post.image} alt="Post" className="post-image" />
                  </div>
                )}
                {post.video && (
                  <div className="video-wrapper">
                    <video controls className="post-video">
                      <source src={post.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                <p>{post.description}</p>
                <div
                  className="delete-post"
                  onClick={() => handleDeletePost(post._id)}
                >
                  <FiTrash2 />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
