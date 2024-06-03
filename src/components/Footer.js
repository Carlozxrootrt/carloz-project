import React from 'react';
import LocationWatcher from '../components/LocationWatcher';
import styles from '../styles/Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 Gambar dan Video Gratis</p>
      <LocationWatcher />
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}><a href="/register" className={styles.navLink}>Register</a></li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
