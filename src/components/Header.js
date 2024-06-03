// src/components/Header.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = ({ loggedIn, handleLogout }) => {
  return (
    <header className={styles.header}>
      <h1>Carloz Project</h1>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/image-gallery">
              <a className={styles.navLink}>Image Gallery</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/video-gallery">
              <a className={styles.navLink}>Video Gallery</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about">
              <a className={styles.navLink}>About</a>
            </Link>
          </li>
          {loggedIn ? (
            <li className={styles.navItem}>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li className={styles.navItem}>
              <Link href="/login">
                <a className={styles.navLink}>Login</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
