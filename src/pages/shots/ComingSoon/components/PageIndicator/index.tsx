import React from 'react';
import styles from './index.module.scss';

const Circle: React.FC<{selected?: boolean}> = ({selected}) => (
  <div className={styles.circle} data-selected={selected} />
);

const PageIndicator: React.FC = () => {
  return (
    <div className={styles.pageIndicator}>
      <Circle selected/>
      <Circle />
      <Circle />
      <Circle />
    </div>
  );
}

export default PageIndicator;
