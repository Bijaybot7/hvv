import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiMessengerLine } from "react-icons/ri";
import { FaRegUserCircle, FaSearch, FaTrash } from "react-icons/fa";
import "./ArtistHome.css";
import axios from "axios";

const ArtistFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [feed, setFeed] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const API_URLS = {
    FETCH_POSTS: "http://localhost:3030/posts",
    FETCH_VACANCIES: "http://localhost:3030/vacancies",
    POST_POST: "http://localhost:3030/posts",
    POST_APPLICATION: "http://localhost:3030/applications",
    POST_LIKE: "http://localhost:3030/likes",
    UPLOAD_FILE: "http://localhost:3030/upload",
    FETCH_LIKES_BY_POST: "http://localhost:3030/likes/post",
    FETCH_COMMENTS_BY_POST: "http://localhost:3030/comments/post",
    POST_COMMENT: "http://localhost:3030/comments",
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;
  const fetchUserNameById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3030/users/${userId}`);
      return response.data.name; // Adjust according to the actual response structure
    } catch (error) {
      console.error(`Error fetching user details for ${userId}:`, error);
      return "Unknown User";
    }
  };

  const fetchLikesForPost = async (postId) => {
    try {
      const response = await axios.get(
        `${API_URLS.FETCH_LIKES_BY_POST}/${postId}`
      );
      return response.data.length;
    } catch (error) {
      console.error(`Error fetching likes for post ${postId}:`, error);
      return 0;
    }
  };
  const fetchCommentsForPost = async (postId) => {
    try {
      const response = await axios.get(
        `${API_URLS.FETCH_COMMENTS_BY_POST}/${postId}`
      );

      // Fetch user names for each comment
      const comments = response.data;
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

  const fetchFeed = async () => {
    try {
      const [postsResponse, vacanciesResponse] = await Promise.all([
        axios.get(API_URLS.FETCH_POSTS),
        axios.get(API_URLS.FETCH_VACANCIES),
      ]);

      const posts = postsResponse.data.map((post) => ({
        ...post,
        type: "post",
        likes: 0, // Initialize likes
        userName: "", // Placeholder for user name
      }));
      const vacancies = vacanciesResponse.data.map((vacancy) => ({
        ...vacancy,
        type: "vacancy",
      }));

      // Fetch likes, comments, and user names for each post
      const likesPromises = posts.map((post) => fetchLikesForPost(post._id));
      const commentsPromises = posts.map((post) =>
        fetchCommentsForPost(post._id)
      );
      const userNamesPromises = posts.map((post) =>
        fetchUserNameById(post.userId)
      );

      const [likesCounts, commentsData, userNames] = await Promise.all([
        Promise.all(likesPromises),
        Promise.all(commentsPromises),
        Promise.all(userNamesPromises),
      ]);

      // Update posts with their like counts, comments, and user names
      const updatedPosts = posts.map((post, index) => ({
        ...post,
        likes: likesCounts[index],
        comments: commentsData[index],
        userName: userNames[index],
      }));

      // Combine and shuffle the feed
      const combinedFeed = [...updatedPosts, ...vacancies].sort(
        () => Math.random() - 0.5
      );
      setFeed(combinedFeed);
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleLike = async (postId) => {
    try {
      await axios.post(API_URLS.POST_LIKE, {
        postId,
        userId,
      });
      // Refetch likes for the specific post
      const updatedLikesCount = await fetchLikesForPost(postId);
      setFeed(
        feed.map((item) =>
          item._id === postId ? { ...item, likes: updatedLikesCount } : item
        )
      );
    } catch (error) {
      console.error("Error liking the post:", error);
    }
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
          setFeed([{ ...response.data, type: "post" }, ...feed]);
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
  const handleApply = async (vacancyId, bandId) => {
    try {
      const newApplication = {
        userId: userId,
        bandId: bandId,
        status: "posted",
        vaccancyId: vacancyId,
      };
      await axios.post(API_URLS.POST_APPLICATION, newApplication);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying for vacancy:", error);
    }
  };
  const handleCommentSubmit = async (postId) => {
    if (newComment.trim() !== "") {
      try {
        const response = await axios.post(API_URLS.POST_COMMENT, {
          postId,
          userId,
          description: newComment,
        });

        if (response.status === 201) {
          // Add the new comment to the existing comments
          setComments((prev) => ({
            ...prev,
            [postId]: [...(prev[postId] || []), response.data],
          }));
          setNewComment(""); // Clear the input
        } else {
          console.error("Failed to post comment:", response.statusText);
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };
  return (
    <div className="middle">
      <div className="feed-container">
        <div className="header">
          
          <div className="icons">
            <Link to="/artistprofile">
              <FaRegUserCircle className="user-icon" />
            </Link>
            <Link to="/artistmessage">
              <RiMessengerLine className="messenger-icon" />
            </Link>
          </div>
        </div>

        <div className="posts-container">
          <h2 className="post-heading">Feed</h2>
          <form className="post-form" onSubmit={handlePostSubmit}>
            <input
              type="text"
              placeholder="Write something..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <input
              type="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
            />
            <button type="submit" className="post-btn">
              Post
            </button>
          </form>
          {feed.map((item) => (
            <div key={item._id} className="feed-item">
              {item.type === "post" ? (
                <div className="post">
                  <FaRegUserCircle className="user-icon" />
                  <p>
                    <strong>Posted by {item.userName || "Unknown User"}</strong>
                  </p>
                  <p>{item.description}</p>
                  {item.image && <img src={item.image} alt="Post content" />}
                  {item.video && <video src={item.video} controls />}
                  <div className="post-interactions">
                    <button
                      className="like-btn"
                      onClick={() => handleLike(item._id)}
                    >
                      Like {item.likes || 0}
                    </button>
                  </div>
                  <div className="comments">
                    <h3>Comments:</h3>
                    {item.comments &&
                      item.comments.map((comment) => (
                        <div key={comment._id} className="comment">
                          <p>
                            <strong>
                              {comment.userName || "Unknown User"}
                            </strong>
                            : {comment.description}
                          </p>
                        </div>
                      ))}
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={() => handleCommentSubmit(item._id)}>
                      Comment
                    </button>
                  </div>
                </div>
              ) : (
                <div className="vacancy-container">
                  <h2>Vacancy</h2>
                  <div className="vacancy-details">
                    <p>
                      <strong>Name:</strong> {item.bandName}
                    </p>
                    <p>
                      <strong>Position:</strong> {item.position}
                    </p>
                    <p>
                      <strong>Location:</strong> {item.location}
                    </p>
                    <p>
                      <strong>Experience:</strong> {item.experience} years
                    </p>
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <button
                      className="join-btn"
                      onClick={() => handleApply(item._id, item.userId)}
                    >
                      APPLY
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistFeed;
