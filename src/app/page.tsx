'use client'
import React from 'react';
import ImageGalleryPage from '../pages/image-gallery';
import VideoGalleryPage from '../pages/video-gallery';
const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <ImageGalleryPage />
        <VideoGalleryPage />
      </main>
    </div>
  );
};

export default App;
