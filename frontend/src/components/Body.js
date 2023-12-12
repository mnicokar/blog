import React, { useState, useEffect } from 'react';
import PostDetail from './PostDetail';
import EditPost from './EditPost';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Body = ({ posts = [], setPosts, isModalOpen, closeModal }) => {
  const sortedPosts = Array.isArray(posts) ? [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)) : [];
  const [selectedPost, setSelectedPost] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const handlePostClick = (post) => {
    setSelectedPost(post);
    console.log("SELECTED POST", selectedPost)
    navigate(`/${post._id}`);
    //console.log('Post clicked:', post._id);

    const openEditMode = () => {
      setIsEditing(true);
    };
    openEditMode();
  };

  const closeEditMode = () => {
    setIsEditing(false);
  };

  const handleEditSave = async (postId, editedData) => {
    const updatedPosts = posts.map((post) =>
      post._id === postId ? { ...post, ...editedData } : post
    );

    setPosts(updatedPosts);

    closeEditMode();
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/${postId}`);
      const updatedPosts = posts.filter((post) => post._id !== postId);
      setPosts(updatedPosts);
      setSelectedPost(null);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Image helper
    function getRandomImageUrl() {
      const width = 250;
      const height = 300;
      const randomId = Math.random().toString(36).substring(7);
      
      return `https://source.unsplash.com/${width}x${height}?sig=${randomId}`; 
    }

  // Add effect for bouncing of posts when screen is resized
  let resizingTimeout;

  const handleResize = () => {
    clearTimeout(resizingTimeout);
    resizingTimeout = setTimeout(() => {
      const posts = document.querySelectorAll('.post');
      posts.forEach((post) => {
        post.classList.add('bouncing');
        setTimeout(() => post.classList.remove('bouncing'), 500);
      });
    }, 1500); // Adjust the delay as needed
  };

  window.addEventListener('resize', handleResize);

  return (
    <div className={`grid-container ${isModalOpen ? 'modal-open' : ''}`}>
      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <div key={post._id} className="post" onClick={() => handlePostClick(post)}>
            <img
              className="post-image"
              src={post.imageUrl || getRandomImageUrl()}
              alt=""
        />
            <div className="post-details">
              <div className="post-date">{new Date(post.date).toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })}</div>
              <div className="post-title">{post.title}</div>
              <div className="post-content">{post.text}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-posts-message">No posts available</div>
      )}

      {selectedPost ? (
        <PostDetail key={selectedPost._id} post={selectedPost} />
      ) : (
        isEditing ? (
          <EditPost
            key={`edit-post-${selectedPost._id}`}
            postId={selectedPost?.id}
            onSave={handleEditSave}
            onCancel={handleEditCancel}
            onDelete={handleDeleteClick}
          />
        ) : null
      )}
    </div>
  );
};

export default Body;
