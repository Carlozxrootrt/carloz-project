"use client";
// src/components/SearchForm.js
import React, { useState } from 'react';
import styles from '../styles/SearchForm.module.css';

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search files..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
          aria-label="Search files"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchForm;
