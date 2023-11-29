import React, { useState } from 'react';
import axios from 'axios';

const EditPost = ({ post, onSave, onCancel }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(post.image);
  const [date, setDate] = useState(post.date);
  const [title, setTitle] = useState(post.title);
  const [editedText, setEditedText] = useState(post.content);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Preview the image
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);
  };

  const handleSave = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }
    formData.append('date', date);
    formData.append('title', title);
    formData.append('content', editedText);

    try {
      const response = await axios.put(
        `http://localhost:3500/posts/${post.id}`,
        formData
      );
      onSave(post.id, response.data);
    } catch (error) {
      console.error('Error updating post:', error);
    }
    setImageFile(null);
  };

  return (
    <div className="edit-post">
      <h2>Edit Post</h2>
      <input type="file" onChange={handleImageChange} />
      {imageUrl && <img src={imageUrl} alt="Preview" />}
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditPost;
