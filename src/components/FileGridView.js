// src/components/FileGridView.js
import React from 'react';
import styles from '../styles/FileGridView.module.css';

function FileGridView({ files, onDelete }) {
  return (
    <div className={styles.gridContainer}>
      {files.map((file) => (
        <div key={file._id} className={styles.gridItem}>
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
          <button className={styles.button} onClick={() => onDelete(file._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default FileGridView;
