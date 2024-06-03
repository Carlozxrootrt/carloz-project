"use client";
// src/components/FileList.js
import React from 'react';
import styles from '../styles/FileList.module.css';

function FileList({ files, onDelete }) {
  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div className={styles.fileList}>
      {files.map((file) => (
        <div key={file._id} className={styles.fileItem}>
          {file.contentType.startsWith('image/') && (
            <img src={`http://localhost:5000/uploads/${file.path}`} alt={file.filename} className={styles.imageThumbnail} />
          )}
          <p>{file.filename}</p>
          <button onClick={() => handleDelete(file._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default FileList;
