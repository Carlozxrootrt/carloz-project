// src/pages/about.js
import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/About.module.css';

const AboutPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.heading}>About Us</h1>
        <p className={styles.paragraph}>
          Welcome to our application! We are dedicated to providing the best
          experience for our users. Our platform offers a wide range of
          functionalities to help you manage your media files efficiently.
        </p>
        <p className={styles.paragraph}>
          Our team is comprised of passionate individuals who are committed to
          continuously improving and adding new features to the platform. We
          believe in the power of technology to simplify and enhance our daily
          tasks, and we strive to deliver that through our application.
        </p>
        <p className={styles.paragraph}>
          Thank you for choosing our platform. If you have any questions or
          feedback, please feel free to reach out to us. We are here to help you
          make the most out of your experience.
        </p>
      </div>
    </Layout>
  );
};

export default AboutPage;
