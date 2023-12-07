import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Modal from './Modal';
import NewPost from './NewPost';

function Header({ onNewPost }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const header = document.querySelector('.header');
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scrolling down, hide the header
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up, show the header
        header.style.transform = 'translateY(0)';
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePostSubmit = (postData) => {
    onNewPost(postData);
    closeModal();
  };

  return (
    <header className="header">
      <div className='underline-box'>
      <Link to="/posts" className="title">Today's Human</Link>
      </div> 
        <FaPlus className="newPost" onClick={openModal}></FaPlus>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <NewPost onSubmit={handlePostSubmit} onCancel={closeModal} />
      </Modal>
    </header>
  );
}

export default Header;
