import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiMessengerLine } from 'react-icons/ri';
import { FaRegUserCircle, FaSearch, FaHeart, FaComment, FaTrash } from 'react-icons/fa';
import './Home.css';


const Home = () => {
  const [showVacancyForm, setShowVacancyForm] = useState(false);
  const [showPostedVacancy, setShowPostedVacancy] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [bandName, setBandName] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [postedVacancies, setPostedVacancies] = useState([]);
  const [showApplyOptionsId, setShowApplyOptionsId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [file, setFile] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [openComments, setOpenComments] = useState({}); // State to track which comments section is open

  const API_URLS = {
    POST_VACANCY: 'http://localhost:8081/home',
    GET_VACANCIES: 'http://localhost:8081/home'
};



// Function to fetch posted vacancies from the server
const fetchPostedVacancies = async () => {
    try {
        const response = await fetch(API_URLS.GET_VACANCIES);
        const data = await response.json();
        setPostedVacancies(data);
    } catch (error) {
        console.error('Error fetching posted vacancies:', error);
    }
};

// Call fetchPostedVacancies in useEffect
useEffect(() => {
    fetchPostedVacancies();
}, []);

// Function to handle form submission for posting a vacancy
const handleSubmit = async (e) => {
    e.preventDefault();
    // Check that all fields are filled
    if (bandName && position && location && experience && description) {
        try {
            const response = await fetch(API_URLS.POST_VACANCY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bandName,
                    position,
                    location,
                    experience,
                    description,
                }),
            });

            if (response.ok) {
                // Refresh posted vacancies after successful posting
                await fetchPostedVacancies();

                // Reset form fields
                setBandName('');
                setPosition('');
                setLocation('');
                setExperience('');
                setDescription('');

                // Close the form
                setShowVacancyForm(false);
            } else {
                console.error('Failed to post vacancy:', response.statusText);
            }
        } catch (error) {
            console.error('Error posting vacancy:', error);
        }
    } else {
        // Alert the user if any field is empty
        alert('Please fill in all fields.');
    }
};




  const handleApplyClick = (id) => {
    setShowApplyOptionsId(id === showApplyOptionsId ? null : id);
  };

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

  const handleDeletePostedVacancy = (id) => {
    // Filter the local state to remove the vacancy with the specified ID
    const updatedVacancies = postedVacancies.filter(vacancy => vacancy.id !== id);
    
    // Update the state with the filtered vacancies list
    setPostedVacancies(updatedVacancies);

    // Log a message indicating successful local deletion
    console.log('Vacancy deleted locally');
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

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
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
    <div className='middle'>
      <div className='feed-container'>
        <div className='header'>
          <div className='search-bar'>
            <FaSearch className='search-icon' />
            <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='icons'>
          <Link to='/lesson' className='lesson-btn'>
                            Lesson
                        </Link>
            <Link to='/Profile'>
              <FaRegUserCircle className='user-icon' />
            </Link>
            <Link to='/message-section'>
            <RiMessengerLine className='messenger-icon' />
            </Link>
          </div>
         
          
        </div>
        <div className='post-vacancy-container'>
          {showVacancyForm ? (
            <form className='post-vacancy-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='bandName'>Band Name</label>
                <input
                  type='text'
                  id='bandName'
                  name='bandName'
                  placeholder='Enter band name'
                  value={bandName}
                  onChange={(e) => setBandName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='position'>Position</label>
                <input
                  type='text'
                  id='position'
                  name='position'
                  placeholder='Enter position'
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
              <div class='form-group'>
                <label htmlFor='location'>Location</label>
                <input
                  type='text'
                  id='location'
                  name='location'
                  placeholder='Enter location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='experience'>Experience</label>
                <input
                  type='text'
                  id='experience'
                  name='experience'
                  placeholder='Enter experience'
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <textarea
                  id='description'
                  name='description'
                  rows='4'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button className='post-btn' type='submit'>
                Post Vacancy
              </button>
              <button className='cancel-btn' onClick={() => setShowVacancyForm(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <button className='post-vacancy-btn' onClick={() => setShowVacancyForm(true)}>
              Post a Vacancy
            </button>
          )}
        </div>
        {/* Toggle Button to show or hide posted vacancies */}
        <button
          className='toggle-posted-vacancy-btn'
          onClick={() => setShowPostedVacancy(!showPostedVacancy)}
        >
          {showPostedVacancy ? 'Hide Posted Vacancies' : 'Show Posted Vacancies'}
        </button>
        {/* Render the posted vacancies container */}
        {showPostedVacancy && (
    <div className='posted-vacancy-container'>
        <h2 className='post-vacancy-heading'>:</h2>
        {postedVacancies.length > 0 ? (
            postedVacancies.map((vacancy, index) => (
                <div key={vacancy.id} className='vacancy'>
                    <h3>{vacancy.BandName}</h3>
                    <p><strong>Position:</strong> {vacancy.Position}</p>
                    <p><strong>Location:</strong> {vacancy.Location}</p>
                    <p><strong>Experience:</strong> {vacancy.Experience}</p>
                    <p><strong>Description:</strong> {vacancy.Description}</p>
                    <button
                        className='delete-posted-vacancy-btn'
                        onClick={() => handleDeletePostedVacancy(vacancy.id)}
                    >
                        <FaTrash />
                    </button>
                </div>
            ))
        ) : (
            <p>No vacancies available at the moment.</p>
        )}
    </div>
)}

        <div className='posts-container'>
          <h2 className='post-heading'>Posts</h2>
          <form className='post-form' onSubmit={handlePostSubmit}>
            <input
              type='text'
              placeholder='Write something...'
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <input type='file' accept='image/*, video/*' onChange={(e) => setFile(e.target.files[0])} />
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
    </div>
  );
};

export default Home;
