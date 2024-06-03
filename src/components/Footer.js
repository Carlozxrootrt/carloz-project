// src/components/Footer.js
import React from 'react';
import Link from 'next/link';
import LocationWatcher from '../components/LocationWatcher';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2024 Carloz Project. All rights reserved.</p>
        <LocationWatcher />
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
