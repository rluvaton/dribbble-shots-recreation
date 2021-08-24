import React, { useState } from 'react';
import styles from './index.module.scss';
import { Shot } from '../../../common/interfaces/shot';
import Players from './components/Players';

const MultiPlayerInteraction: React.FC = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(4);

  return (
    <div className={styles.card}>
      <Players numberOfPlayers={numberOfPlayers}/>
      <button disabled={numberOfPlayers <= 1} onClick={() => setNumberOfPlayers(prev => prev - 1)}>-</button>
      <button disabled={numberOfPlayers >= 4} onClick={() => setNumberOfPlayers(prev => prev + 1)}>+</button>
    </div>
  );
}


export const shot: Shot = {
  id: 'multi-player-interaction',
  name: 'Multi-player interaction',
  description: '',
  link: '/multi-player-interaction',
  createComponent: () => <MultiPlayerInteraction/>,
  originalShotLink: 'https://dribbble.com/shots/11568643-Multi-player-interaction',
}

export default MultiPlayerInteraction;
