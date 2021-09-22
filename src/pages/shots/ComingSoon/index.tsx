import React from 'react';
import styles from './index.module.scss';
import { Shot } from '../../../common/interfaces/shot';
import ComingSoonText from './components/ComingSoonText';
import NavBar from './components/NavBar';
import DownArrowIcon from './components/DownArrowIcon';
import PageIndicator from './components/PageIndicator';

const ComingSoon: React.FC<{ preview?: boolean }> = ({ preview = false }) => {
  // In the original shot the progress is really 76, but with that progress the text fill is not at the same position
  // So we prefer better filling then the same progress value
  const progress = 74;

  return (
    <div className={styles.page} data-preview={preview}>
      <NavBar/>

      <div className={styles.comingSoonContainer}>
        <ComingSoonText progress={progress}/>
        <span className={styles.progressText}>{progress}%</span>
      </div>

      <div className={styles.pagesIndicator}>
        <PageIndicator/>
      </div>

      <div className={styles.arrowContainer}>
        <DownArrowIcon/>
      </div>
    </div>
  );
}


export const shot: Shot = {
  id: 'coming-soon',
  name: 'Coming soon',
  description: '',
  link: '/coming-soon',

  createComponent: (preview) => <ComingSoon preview={preview}/>,

  originalShotLink: 'https://dribbble.com/shots/2557789-Coming-soon',
  author: {
    name: 'Oleg Frolov',
    link: 'https://dribbble.com/Volorf',
  },

  directoryPath: __dirname,
}

export default ComingSoon;
