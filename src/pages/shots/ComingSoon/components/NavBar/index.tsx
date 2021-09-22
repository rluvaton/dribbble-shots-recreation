import React from 'react';
import styles from './index.module.scss';


const NavBar: React.FC = () => (
  <div role="menu" className={styles.menu}>
    <span role="menuitem" className={styles.item} data-selected="true">How soon</span>

    <span role="menuitem" className={styles.item}>About</span>
    <span role="menuitem" className={styles.item}>Features</span>
    <span role="menuitem" className={styles.item}>Contacts</span>
  </div>
);

export default NavBar;
