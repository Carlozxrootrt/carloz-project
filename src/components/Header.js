// src/components/Header.js
import React, { useState , useEffect , useRef } from 'react';
import styles from '../styles/Header.module.css'; // Import file CSS untuk styling
import { logout, isLoggedIn } from '../services/authService';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
  };

  return (
    <header className={styles.header}>
      <h1>Keluarin</h1>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}><a href="/" className={styles.navLink}>Home</a></li>
          <li className={styles.navItem}><a href="/image-gallery" className={styles.navLink}>Gambar</a></li>
          <li className={styles.navItem}><a href="/video-gallery" className={styles.navLink}>Video</a></li>
          <li className={styles.navItem}><a href="/about" className={styles.navLink}>About</a></li>
          {loggedIn ? (
            <li className={styles.navItem}>
              <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </li>
          ) : (
            <li className={styles.navItem}>
              <a href="/login" className={styles.navLink}>Login</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
