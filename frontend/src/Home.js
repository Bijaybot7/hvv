import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiMessengerLine } from "react-icons/ri";
import { FaRegUserCircle, FaSearch, FaTrash } from "react-icons/fa";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [showVacancyForm, setShowVacancyForm] = useState(false);
  const [showPostedVacancy, setShowPostedVacancy] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bandName, setBandName] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [postedVacancies, setPostedVacancies] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState(null);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [commentInput, setCommentInput] = useState({});

  const API_URLS = {
    POST_VACANCY: "http://localhost:3030/vacancies",
    GET_VACANCIES: "http://localhost:3030/vacancies/user/",
    POST_POST: "http://localhost:3030/posts",
    GET_POSTS: "http://localhost:3030/posts",
    UPLOAD_FILE: "http://localhost:3030/upload",
    POST_LIKE: "http://localhost:3030/likes",
    POST_COMMENT: "http://localhost:3030/comments",
    GET_LIKES: "http://localhost:3030/likes/post",
    GET_COMMENTS: "http://localhost:3030/comments/post",
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;
  const fetchPostedVacancies = async () => {
    if (userId) {
      try {
        const response = await axios.get(`${API_URLS.GET_VACANCIES}${userId}`);
        setPostedVacancies(response.data);
      } catch (error) {
        console.error("Error fetching posted vacancies:", error);
      }
    }
  };
  const fetchUserNameById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3030/users/${userId}`);
      return response.data.name; // Adjust according to your API response
    } catch (error) {
      console.error(`Error fetching user details for ${userId}:`, error);
      return "Unknown User";
    }
  };

  const fetchLikesForPost = async (postId) => {
    try {
      const response = await axios.get(`${API_URLS.GET_LIKES}/${postId}`);
      return response.data.length; // Assuming response.data is an array of likes
    } catch (error) {
      console.error(`Error fetching likes for post ${postId}:`, error);
      return 0;
    }
  };

  const fetchCommentsForPost = async (postId) => {
    try {
      const response = await axios.get(`${API_URLS.GET_COMMENTS}/${postId}`);
      const comments = response.data;

      // Fetch user names for each comment
      const userNamesPromises = comments.map((comment) =>
        fetchUserNameById(comment.userId)
      );
      const userNames = await Promise.all(userNamesPromises);

      return comments.map((comment, index) => ({
        ...comment,
        userName: userNames[index],
      }));
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
      return [];
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URLS.GET_POSTS);
      const postsData = response.data;

      const postsWithLikesAndComments = await Promise.all(
        postsData.map(async (post) => {
          const likes = await fetchLikesForPost(post._id);
          const comments = await fetchCommentsForPost(post._id);
          return {
            ...post,
            likes,
            comments,
          };
        })
      );

      setPosts(postsWithLikesAndComments);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPostedVacancies();
    fetchPosts();
  }, [userId]);

  const handleCommentChange = (postId, e) => {
    setCommentInput({
      ...commentInput,
      [postId]: e.target.value,
    });
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(API_URLS.POST_LIKE, {
        postId,
        userId,
      });
      const updatedLikesCount = await fetchLikesForPost(postId);
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, likes: updatedLikesCount } : post
        )
      );
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleCommentSubmit = async (postId, commentText) => {
    if (commentText.trim() !== "") {
      try {
        const response = await axios.post(API_URLS.POST_COMMENT, {
          postId,
          userId,
          description: commentText,
        });

        if (response.status === 201) {
          const updatedComments = await fetchCommentsForPost(postId);
          setPosts(
            posts.map((post) =>
              post._id === postId
                ? { ...post, comments: updatedComments }
                : post
            )
          );
        } else {
          console.error("Failed to post comment:", response.statusText);
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bandName && position && location && experience && description) {
      try {
        const response = await axios.post(API_URLS.POST_VACANCY, {
          bandName,
          position,
          location,
          experience,
          description,
          userId,
        });

        if (response.status === 201) {
          await fetchPostedVacancies();
          setBandName("");
          setPosition("");
          setLocation("");
          setExperience("");
          setDescription("");
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (postContent.trim() !== "" || file) {
      try {
        let imagePath = "";
        let videoPath = "";

        if (file) {
          const formData = new FormData();
          formData.append("files", file);
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
          if (file.type.startsWith("image/")) {
            imagePath = filePath;
          } else if (file.type.startsWith("video/")) {
            videoPath = filePath;
          }
        }

        const response = await axios.post(API_URLS.POST_POST, {
          name: "Post",
          description: postContent,
          userId,
          image: imagePath,
          video: videoPath,
        });

        if (response.status === 201) {
          await fetchPosts();
          setPostContent("");
          setFile(null);
        } else {
          console.error("Failed to create post:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  return (
    <div className="middle">
      <div className="feed-container">
        <div className="header">
          <div className="icons">
            <Link to="/Profile">
              <FaRegUserCircle className="user-icon" />
            </Link>
            <Link to="/message-section">
              <RiMessengerLine className="messenger-icon" />
            </Link>
          </div>
        </div>
        <div className="post-vacancy-container">
          {showVacancyForm ? (
            <form className="post-vacancy-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="bandName">Band Name</label>
                <input
                  type="text"
                  id="bandName"
                  name="bandName"
                  placeholder="Enter band name"
                  value={bandName}
                  onChange={(e) => setBandName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Enter position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  placeholder="Enter experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button type="submit" className="post-btn">
                Post
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowVacancyForm(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              className="create-post-btn"
              onClick={() => setShowVacancyForm(true)}
            >
              Post a Vacancy
            </button>
          )}
        </div>
        <button
          className="posted-vacancy-btn"
          onClick={() => setShowPostedVacancy(!showPostedVacancy)}
        >
          {showPostedVacancy
            ? "Hide Posted Vacancies"
            : "Show Posted Vacancies"}
        </button>
        <div className="posted-vacancy-container">
          {showPostedVacancy && (
            <div className="posted-vacancies">
              {postedVacancies.length > 0 ? (
                postedVacancies.map((vacancy) => (
                  <div key={vacancy._id} className="vacancy-card">
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
        <div className="create-post">
          <form className="create-post-form" onSubmit={handlePostSubmit}>
            <textarea
              placeholder="Write a post..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Post</button>
          </form>
        </div>
        <div className="posts">
          {posts.map((post) => (
            <div key={post._id} className="post">
              <p>{post.description}</p>
              {post.image && <img src={post.image} alt="Post content" />}
              {post.video && <video src={post.video} controls />}
              <div className="post-actions">
                <button onClick={() => handleLike(post._id)}>
                  Like {post.likes || 0}
                </button>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCommentSubmit(
                      post._id,
                      e.target.elements.comment.value
                    );
                    e.target.reset();
                  }}
                >
                  <input
                    type="text"
                    name="comment"
                    placeholder="Add a comment..."
                  />
                  <button type="submit">Comment</button>
                </form>
                <div className="comments">
                  {post.comments.map((comment) => (
                    <div key={comment._id} className="comment">
                      <p>
                        <strong>{comment.userName || "Unknown User"}:</strong>{" "}
                        {comment.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
