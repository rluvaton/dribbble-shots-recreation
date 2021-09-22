import React from 'react';
import styles from './index.module.scss';


const NavBar: React.FC = () => (
  <nav className={styles.menu}>
    <span data-selected="true">How soon</span>

    <span>About</span>
    <span>Features</span>
    <span>Contacts</span>
  </nav>
);

export default NavBar;
