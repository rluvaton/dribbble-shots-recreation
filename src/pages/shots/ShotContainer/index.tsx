import React from 'react';
import styles from './index.module.scss';
import { Shot } from '../../../common/interfaces/shot';
import DesignedBy from '../shared/DesignedBy';

interface ShotContainerProps {
  shot: Shot
}

const ShotContainer: React.FC<ShotContainerProps> = ({ shot }) => {
  return (
    <div className={styles.shotContainer}>
      <div className={styles.component}>{shot.createComponent()}</div>

      <div className={styles.info}>
        <DesignedBy author={shot.author.name} link={shot.author.link}/>
      </div>

    </div>
  )
}

export default ShotContainer;
