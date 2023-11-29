import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Body from './components/Body';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost';

const postId = EditPost.postId
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/posts" element={<Body/>}/>
        <Route path={`/posts/${postId}`} element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
