import React from 'react';
import styles from './index.module.scss';

interface ActionsProps {
  preview?: boolean,
  numberOfPlayers: number,
  setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>
}

const Content: React.FC<ActionsProps> = ({ numberOfPlayers, setNumberOfPlayers, preview }) => {
  return (
    <div className={styles.content}>
      <span className={styles.title}>Number of Players</span>
      <div className={styles.actions}>
        <div className={`${styles.minusIcon} ${preview || numberOfPlayers <= 1 ? 'disabled' : ''}`}
             onClick={() => preview || numberOfPlayers <= 1 || setNumberOfPlayers(prev => prev - 1)}/>

        <span className={styles.numberOfPlayers}>{numberOfPlayers}</span>

        <div className={`${styles.plusIcon} ${preview || numberOfPlayers >= 4 ? 'disabled' : ''}`}
             onClick={() => preview || numberOfPlayers >= 4 || setNumberOfPlayers(prev => prev + 1)}/>
      </div>
    </div>
  );
}

export default Content;
