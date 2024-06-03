// src/pages/image-gallery.js
import React from 'react';
import Layout from '../components/Layout';
import ImageGallery from '../components/ImageGallery';

const ImageGalleryPage = () => {
  return (
    <Layout>
      <h1>Image Gallery</h1>
      <ImageGallery />
    </Layout>
  );
};

export default ImageGalleryPage;
