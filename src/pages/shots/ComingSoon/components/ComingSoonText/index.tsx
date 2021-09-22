import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

export interface ComingSoonTextProps {
  progress: number;
}

const ComingSoonText: React.FC<ComingSoonTextProps> = ({ progress }) => {
  // We can do just '0' without the '%' but for the sake of testing we add the percentage sign
  const [width, setWidth] = useState('0%');

  useEffect(() => {
    // This is so it will animate the width changing
    // If not doing so the width will just set immediately without "filling" animation
    const setWidthTimeout = setTimeout(() => setWidth(`${progress ?? 100}%`), 0);

    return () => clearTimeout(setWidthTimeout);
  }, [progress]);

  return (
    <div className={styles.container}>
      <span className={styles.behind}>COMING SOON</span>
      <span aria-valuenow={progress} className={styles.full} style={{ width }}>COMING SOON</span>
    </div>
  );
}

export default ComingSoonText;
