import React from 'react';
import styles from './index.module.scss';
import { Shot } from '../../../common/interfaces/shot';
import ComingSoonText from './components/ComingSoonText';
import NavBar from './components/NavBar';

const ComingSoon: React.FC<{ preview?: boolean }> = ({ preview = false }) => {
  return (
    <div className={styles.page}>
      <NavBar/>
      <div>
        <div>
          <ComingSoonText progress={74}/>
          <span className={styles.progressText}>74%</span>
        </div>
        {/*<PagesIndicator/>*/}
      </div>
      <div>
        arrow
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
