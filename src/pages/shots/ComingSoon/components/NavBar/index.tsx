import React from 'react';
import styles from './index.module.scss';


const NavBar: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item} data-selected="true">How soon</div>

      <div className={styles.item}>About</div>
      <div className={styles.item}>Features</div>
      <div className={styles.item}>Contacts</div>
    </div>
  );
}

export default NavBar;
