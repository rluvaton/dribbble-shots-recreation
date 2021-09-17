import React from 'react';
import styles from './index.module.scss';

export interface ContentProps {
  preview?: boolean,
  numberOfPlayers: number,
  setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>
}

const Content: React.FC<ContentProps> = ({ numberOfPlayers, setNumberOfPlayers, preview }) => {
  return (
    <div className={styles.content}>
      <span className={styles.title}>Number of Players</span>
      <div className={styles.actions}>
        <div data-testid="minus" className={`${styles.minusIcon}${preview || numberOfPlayers <= 1 ? ' disabled' : ''}`}
             onClick={() => preview || numberOfPlayers <= 1 || setNumberOfPlayers(prev => prev - 1)}/>

        <span className={styles.numberOfPlayers}>{numberOfPlayers}</span>

        <div data-testid="plus" className={`${styles.plusIcon}${preview || numberOfPlayers >= 4 ? ' disabled' : ''}`}
             onClick={() => preview || numberOfPlayers >= 4 || setNumberOfPlayers(prev => prev + 1)}/>
      </div>
    </div>
  );
}

export default Content;
