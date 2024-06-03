// src/components/MediaList.js
import React, { useState, useRef } from 'react';
import styles from '../styles/MediaList.module.css';
import { isLoggedIn } from '../services/authService';

const MediaList = ({ files = [] }) => {
  const [previewFile, setPreviewFile] = useState(null);
  const modalRef = useRef(null);
  const [loggedIn] = useState(isLoggedIn());

  const handleFileClick = (file) => {
    setPreviewFile(file);
    if (modalRef.current) {
      modalRef.current.style.display = 'flex';
    }
  };

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.style.display = 'none';
    }
    setPreviewFile(null);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/files/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFiles(files.filter(file => file._id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div className={styles.gridContainer}>
      {files.map((file) => (
        <div key={file._id} className={styles.gridItem} onClick={() => handleFileClick(file)}>
          {file.contentType.startsWith('image/') && (
            <img src={`http://localhost:5000/uploads/${file.path}`} alt={file.filename} className={styles.imageThumbnail} />
          )}
          {file.contentType.startsWith('video/') && (
            <video controls className={styles.videoThumbnail}>
              <source src={`http://localhost:5000/uploads/${file.path}`} type={file.contentType} />
              Your browser does not support the video tag.
            </video>
          )}
          <p><strong>Filename:</strong> {file.filename}</p>
          <p><strong>Description:</strong> {file.description}</p>
          <p><strong>Category:</strong> {file.category}</p>
          <p><strong>Country:</strong> {file.country}</p>
          {loggedIn && (
            <button className={styles.button} onClick={(e) => {
              e.stopPropagation();
              handleDelete(file._id);
            }}>Delete</button>
          )}
        </div>
      ))}

      {previewFile && (
        <div ref={modalRef} className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleClose}>&times;</span>
            {previewFile.contentType.startsWith('image/') && (
              <img src={`http://localhost:5000/uploads/${previewFile.path}`} alt={previewFile.filename} />
            )}
            {previewFile.contentType.startsWith('video/') && (
              <video controls>
                <source src={`http://localhost:5000/uploads/${previewFile.path}`} type={previewFile.contentType} />
                Your browser does not support the video tag.
              </video>
            )}
            <p><strong>Filename:</strong> {previewFile.filename}</p>
            <p><strong>Description:</strong> {previewFile.description}</p>
            <p><strong>Category:</strong> {previewFile.category}</p>
            <p><strong>Country:</strong> {previewFile.country}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaList;
