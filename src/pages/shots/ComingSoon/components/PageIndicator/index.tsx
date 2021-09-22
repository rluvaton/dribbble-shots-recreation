import React from 'react';
import styles from './index.module.scss';

const Circle: React.FC<{ selected?: boolean, title: string }> = ({ title, selected }) => (
  <div role="img" title={title} className={styles.circle} data-selected={selected}/>
);

const PageIndicator: React.FC = () => (
  <div role="menu" className={styles.pageIndicator}>
    <Circle title="How soon" selected/>
    <Circle title="About"/>
    <Circle title="Features"/>
    <Circle title="Contacts"/>
  </div>
);

export default PageIndicator;
