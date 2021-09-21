import React from 'react';
import styles from './index.module.scss';

export interface ComingSoonTextProps {
  progress: number;
}

const ComingSoonText: React.FC<ComingSoonTextProps> = ({ progress }) => {
  return (
    <div className={styles.container}>
      <span className={styles.full} style={{
        width: `${progress ?? 100}%`,
      }}>COMING SOON</span>
      <span className={styles.behind}>COMING SOON</span>
    </div>
  );
}

export default ComingSoonText;
