import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PostDetail from './components/PostDetail';
import Main from './pages/Main';
import SinglePost from './pages/SinglePost';
//"65562ba3aa31134bc74835d0"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/:postId" element={<SinglePost/>} />
    </Routes>
    );
  };
  
export default App;
