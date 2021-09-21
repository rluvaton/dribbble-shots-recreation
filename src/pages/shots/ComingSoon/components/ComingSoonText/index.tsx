import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

export interface ComingSoonTextProps {
  progress: number;
}


const ComingSoonText: React.FC<ComingSoonTextProps> = ({ progress }) => {
  const [progressWidth, setProgressWidth] = useState('fit-content');
  const behindDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!behindDivRef.current) {
      return;
    }

    setProgressWidth(`${behindDivRef.current.offsetWidth * (progress / 100)}px`);
  }, [progress]);

  return (
    <div className={styles.container}>
      <div className={styles.full} style={{
        width: progressWidth,
      }}>COMING SOON</div>
      <div ref={behindDivRef} className={styles.behind}>COMING SOON</div>
    </div>
  );
}

export default ComingSoonText;
