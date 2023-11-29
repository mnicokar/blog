import React, { useState } from 'react';
import PostDetail from './PostDetail';
import EditPost from './EditPost';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Body = ({ posts = [], setPosts, isModalOpen, closeModal }) => {
  console.log('isModalOpen in Body:', isModalOpen)

  const sortedPosts = Array.isArray(posts) ? [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)): [];
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const handlePostClick = (post) => {
    setSelectedPost(post);
    navigate(`/posts/${post.id}`);

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
      post.id === postId ? { ...post, ...editedData } : post
    );

    setPosts(updatedPosts);

    closeEditMode();
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = async (postId) => {
    try {
      await axios.delete(`http://localhost:3500/posts/${postId}`);
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      setSelectedPost(null);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className={`grid-container ${isModalOpen ? 'modal-open' : ''}`}>
      {sortedPosts.map((post) => (
        <div key={post.id} className="post" onClick={() => handlePostClick(post)}>
          <img className="post-image" 
              src={post.imageUrl ? post.imageUrl : './assets/defaultImg.jpg'}
              alt="" />
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
      ))}

      {selectedPost ? (
        <PostDetail post={selectedPost} />
      ) : (
        isEditing ? (
          <EditPost
            postId={selectedPost?.id}  // Make sure to handle null case appropriately
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
