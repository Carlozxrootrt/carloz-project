// src/pages/media.js
import React, { useState } from 'react';
import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';
import MediaList from '../components/MediaList';

const MediaPage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/files?query=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      setError('Error fetching files');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>Media Gallery</h1>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MediaList files={files} />
      )}
    </Layout>
  );
};

export default MediaPage;
