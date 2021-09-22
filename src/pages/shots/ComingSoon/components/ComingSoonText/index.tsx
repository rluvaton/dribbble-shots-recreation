import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

export interface ComingSoonTextProps {
  progress: number;
}

const ComingSoonText: React.FC<ComingSoonTextProps> = ({ progress }) => {
  const [width, setWidth] = useState('0');

  useEffect(() => {
    // This is so it will animate the width changing
    // If not doing so the width will just set immediately without "filling" animation
    const setWidthTimeout = setTimeout(() => setWidth(`${progress ?? 100}%`), 1);

    return () => clearTimeout(setWidthTimeout);
  }, [progress]);

  return (
    <div className={styles.container}>
      <span className={styles.full} style={{ width }}>COMING SOON</span>
      <span className={styles.behind}>COMING SOON</span>
    </div>
  );
}

export default ComingSoonText;
