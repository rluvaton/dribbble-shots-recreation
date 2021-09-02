import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { Shot } from '../../../common/interfaces/shot';
import Players from './components/Players';
import anime, { AnimeInstance } from 'animejs';
import usePrevious from '../../../common/hooks/usePrevious';

const MultiPlayerInteraction: React.FC = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const prevNumberOfPlayers = usePrevious(numberOfPlayers);

  const cardRef = useRef(null);
  const clickAnimation = useRef<AnimeInstance>();

  useEffect(() => {
    clickAnimation.current = anime({
      targets: cardRef.current,
      autoplay: false,
      scale: [1, 0.97],
      direction: 'alternate',
      duration: 200,
      easing: 'linear',
    });

    // We do useEffect on `useRef` result in order to know when the reference has been made
  }, [cardRef]);

  useEffect(() => {
    // Don't animate if click animation hasn't set yet / this previous number of player is undefined - meaning it's the first render
    if(!clickAnimation.current || prevNumberOfPlayers === undefined) {
      return;
    }

    clickAnimation.current.play();
  }, [numberOfPlayers, prevNumberOfPlayers]);

  return (
    <div className={styles.page}>
      <div className={styles.card} ref={cardRef}>
        <Players numberOfPlayers={numberOfPlayers}/>
        <button disabled={numberOfPlayers <= 1} onClick={() => setNumberOfPlayers(prev => prev - 1)}>-</button>
        <button disabled={numberOfPlayers >= 4} onClick={() => setNumberOfPlayers(prev => prev + 1)}>+</button>
      </div>
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
