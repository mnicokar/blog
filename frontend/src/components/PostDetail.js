import React from 'react';

const PostDetail = ({ post }) => {
  
  if (!post) {
    return console.log('No post found');
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>Date: {new Date(post.date).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })}</p>
      <img src={post.imageUrl} alt="post" />
      <p>{post.text}</p>
    </div>
  );
};

export default PostDetail;
