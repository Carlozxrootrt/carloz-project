"use client";

// src/components/ImageGridView.js
import React, { useState, useEffect } from 'react';
import FileGridView from './FileGridView';

const ImageGridView = () => {
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/files?type=image')
      .then(response => response.json())
      .then(data => {
        setImageFiles(data.filter(file => file.contentType.startsWith('image')));
      })
      .catch(error => {
        console.error('Error fetching image files:', error);
      });
  }, []);

  return (
    <div>
      <h2>Image Gallery</h2>
      <FileGridView files={imageFiles} />
    </div>
  );
};

export default ImageGridView;
