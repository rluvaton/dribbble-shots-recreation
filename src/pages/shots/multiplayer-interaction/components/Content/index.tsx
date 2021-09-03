import React from 'react';
import styles from './index.module.scss';

interface ActionsProps {
  numberOfPlayers: number,
  setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>
}

const Content: React.FC<ActionsProps> = ({ numberOfPlayers, setNumberOfPlayers }) => {
  return (
    <div className={styles.content}>
      <span className={styles.title}>Number of Players</span>
      <div className={styles.actions}>
        <div className={`${styles.minusIcon} ${numberOfPlayers <= 1 ? 'disabled' : ''}`}
             onClick={() => numberOfPlayers <= 1 || setNumberOfPlayers(prev => prev - 1)}/>

        <span className={styles.numberOfPlayers}>{numberOfPlayers}</span>

        <div className={`${styles.plusIcon} ${numberOfPlayers >= 4 ? 'disabled' : ''}`}
             onClick={() => numberOfPlayers >= 4 || setNumberOfPlayers(prev => prev + 1)}/>
      </div>
    </div>
  );
}

export default Content;
