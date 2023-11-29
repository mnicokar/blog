import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';
// import PostDetail from './components/PostDetail';

function App() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3500/posts');
      console.log('Response:', response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addNewPost = async (newPost) => {
    try {
      const response = await axios.post('http://localhost:3500/posts', newPost);
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error('Error adding new post:', error);
    }
  };

  return (
      <div className={`App ${isModalOpen ? 'modal-open' : ''}`}>
      <Header onNewPost={addNewPost} openModal = {openModal}/>
      <Body posts={posts} setPosts={setPosts} isModalOpen={isModalOpen} closeModal={closeModal}/>
      </div>
  );
}
export default App;
