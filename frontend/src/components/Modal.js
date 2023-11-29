import React from 'react';
import { CloseButton } from '@chakra-ui/react'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-form">
      <CloseButton className="modal-close" onClick={onClose}/>
        {children}
      </div>
    </div>
  );
};

export default Modal;
