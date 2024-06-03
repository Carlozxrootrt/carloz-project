"use client";

// src/components/VideoGridView.js
import React, { useState, useEffect } from 'react';
import FileGridView from './FileGridView';

const VideoGridView = () => {
  const [videoFiles, setVideoFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/files?type=video')
      .then(response => response.json())
      .then(data => {
        setVideoFiles(data.filter(file => file.contentType.startsWith('video')));
      })
      .catch(error => {
        console.error('Error fetching video files:', error);
      });
  }, []);

  return (
    <FileGridView files={videoFiles} />
  );
};

export default VideoGridView;
