// src/pages/dashboard.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../components/Header';
import UploadForm from '../components/UploadForm';
import FileGridView from '../components/FileGridView';
import SearchForm from '../components/SearchForm';
import Layout from '../components/Layout';

function Dashboard() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }

    fetchLocationData();

    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect to login if not logged in
    } else {
      fetchFiles();
    }
  }, []);

  const fetchLocationData = async () => {
    try {
      const response = await axios.get('https://get.geojs.io/v1/ip/geo.json');
      setLocationData(response.data);
    } catch (error) {
      setError('Error fetching location data');
      console.error(error);
    }
  };

  const fetchFiles = async (query = '') => {
    try {
      const res = await fetch(`http://localhost:5000/api/files?query=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
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

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/files/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchFiles();
    } catch (error) {
      setError('Error deleting file');
      console.error(error);
    }
  };

  return (
    <Layout>
      <h1>Dashboard</h1>
      {name && <p>Welcome, {name}</p>}
      {locationData && (
        <p>
          Your location: {locationData.city}, {locationData.region}, {locationData.country}
        </p>
      )}
      <SearchForm onSearch={fetchFiles} />
      <UploadForm onUpload={fetchFiles} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <FileGridView files={files} onDelete={handleDelete} />
      )}
    </Layout>
  );
}

export default Dashboard;
