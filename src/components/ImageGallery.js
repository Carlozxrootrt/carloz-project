// src/components/ImageGallery.js
import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/MediaList.module.css';
import { isLoggedIn } from '../services/authService';

const ImageGallery = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const modalRef = useRef(null);
  const [loggedIn] = useState(isLoggedIn());

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/files');
        const data = await res.json();
        const imageFiles = data.filter(file => file.contentType.startsWith('image/'));
        setFiles(imageFiles);
      } catch (error) {
        setError('Error fetching files');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        files.map((file) => (
          <div key={file._id} className={styles.gridItem} onClick={() => handleFileClick(file)}>
            <img src={`http://localhost:5000/uploads/${file.path}`} alt={file.filename} className={styles.imageThumbnail} />
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
        ))
      )}

      {previewFile && (
        <div ref={modalRef} className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleClose}>&times;</span>
            <img src={`http://localhost:5000/uploads/${previewFile.path}`} alt={previewFile.filename} />
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

export default ImageGallery;
