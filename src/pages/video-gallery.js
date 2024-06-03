// src/pages/video-gallery.js
import React from 'react';
import Layout from '../components/Layout';
import VideoGallery from '../components/VideoGallery';

const VideoGalleryPage = () => {
  return (
    <Layout>
      <h1>Video Gallery</h1>
      <VideoGallery />
    </Layout>
  );
};

export default VideoGalleryPage;
