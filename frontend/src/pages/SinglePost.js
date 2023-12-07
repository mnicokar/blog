import React from 'react';
import PostDetail from '../components/PostDetail';
import Header from '../components/Header';

function SinglePost() {
  return (
    <div>
      <Header />
      <PostDetail post={post} />
    </div>
  )
};

export default SinglePost;