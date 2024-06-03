// src/components/Layout.js
import React, { useEffect, useState } from 'react';
import { getLocation, saveLocation } from '../services/LocationService';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationAndSave = async () => {
      try {
        const position = await getLocation();
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        await saveLocation(latitude, longitude);
      } catch (error) {
        setError('Error fetching or saving location');
        console.error(error);
      }
    };

    fetchLocationAndSave();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
