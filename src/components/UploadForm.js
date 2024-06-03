"use client";
import React, { useState, useEffect } from 'react';
import styles from '../styles/UploadForm.module.css';

function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryNames = data.map(country => country.name.common).sort();
        setCountries(countryNames);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('country', country);

    try {
      const response = await fetch('http://localhost:5000/api/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      setMessage('File uploaded successfully.');
      setFile(null);
      setDescription('');
      setCategory('');
      setCountry('');

      if (typeof onUpload === 'function') {
        onUpload(); // This assumes onUpload is a function that triggers a refresh
      }
    } catch (error) {
      setMessage('Error uploading file: ' + error.message);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <form onSubmit={handleUpload} className={styles.uploadForm}>
        <h2>Upload File</h2>
        <label htmlFor="file">Choose file:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          required
        />
        
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          <option value="">Select a country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>

        <button type="submit">Upload</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default UploadForm;
