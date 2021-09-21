import React from 'react';
import styles from './index.module.scss';


const NavBar: React.FC = () => {
  return (
    <div className={styles.container}>
      <span className={styles.item}>How soon</span>

      <span className={styles.item}>About</span>
      <span className={styles.item}>Features</span>
      <span className={styles.item}>Contacts</span>
    </div>
  );
}

export default NavBar;
