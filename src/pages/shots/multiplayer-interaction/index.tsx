import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { Shot } from '../../../common/interfaces/shot';
import Players from './components/Players';
import anime, { AnimeInstance } from 'animejs';
import usePrevious from '../../../common/hooks/usePrevious/';
import Content from './components/Content';

// We use 0.5 when in preview so the background will be should too
const calcRegularScale = (preview: boolean) => preview ? 0.5 : 1;

const MultiPlayerInteraction: React.FC<{ preview?: boolean }> = ({ preview = false }) => {
  // When we are on preview we show the entire card while not breaking the card look
  const [regularScale, setRegularScale] = useState(calcRegularScale(preview));

  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const prevNumberOfPlayers = usePrevious(numberOfPlayers);

  const cardRef = useRef(null);
  const clickAnimation = useRef<AnimeInstance>();

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }

    clickAnimation.current = anime({
      targets: cardRef.current,
      autoplay: false,
      scale: [regularScale, regularScale - 0.03],
      direction: 'alternate',
      duration: 200,
      easing: 'linear',
    });
  }, [regularScale]);

  useEffect(() => {
    setRegularScale(calcRegularScale(preview));
  }, [preview]);

  useEffect(() => {
    // Don't animate if click animation hasn't set yet / this previous number of player is undefined - meaning it's the first render
    if (!clickAnimation.current || prevNumberOfPlayers === undefined) {
      return;
    }

    clickAnimation.current.play();

    // Most of the time you shouldn't put this ignore,
    // but eslint complain about not adding `prevNumberOfPlayers` to the deps list, although `prevNumberOfPlayers` is just the `.current` of `useRef` result
    //
    // So we need to be aware when changing the implementation to add / remove deps (and if not using usePrevious result it's better remove these comments)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfPlayers]);

  return (
    <div className={styles.page}>
      <div data-testid="card" className={styles.card} ref={cardRef}>
        <Players numberOfPlayers={numberOfPlayers}/>
        <Content preview={preview} numberOfPlayers={numberOfPlayers} setNumberOfPlayers={setNumberOfPlayers}/>
      </div>
    </div>
  );
}


export const shot: Shot = {
  id: 'multi-player-interaction',
  name: 'Multi-player interaction',
  description: '',
  link: '/multi-player-interaction',
  createComponent: (preview) => <MultiPlayerInteraction preview={preview}/>,
  originalShotLink: 'https://dribbble.com/shots/11568643-Multi-player-interaction',
}

export default MultiPlayerInteraction;
