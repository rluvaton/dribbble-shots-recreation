import React from 'react';
import styles from './index.module.scss';

const ShotCover: React.FC = ({ children }) => {
  return <div className={styles.cover}>{children}</div>;
}

export default ShotCover;
