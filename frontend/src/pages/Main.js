import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Body from '../components/Body';
import '../App.css';

function Main() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const baseURL = 'http://localhost:3001/';

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
      const response = await axios.get(baseURL);
      console.log('Response:', response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addNewPost = async (newPost) => {
    try {
      const response = await axios.post('/', newPost);
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error('Error adding new post:', error);
    }
  };
  
  return (
      <div className={`App ${isModalOpen ? 'modal-open' : ''}`}>
      <Header onNewPost={addNewPost} openModal = {openModal}/>
      <Body posts={posts} setPosts={setPosts} 
      isModalOpen={isModalOpen} closeModal={closeModal}/>
      
      </div>
  );
}
export default Main;