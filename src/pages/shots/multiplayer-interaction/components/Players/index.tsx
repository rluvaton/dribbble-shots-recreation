import React, { useEffect, useState, useRef } from 'react';
import Player from '../Player';
import styles from './index.module.scss';
import useDelayUnmount from '../../../../../common/hooks/useDelayUnmount';
import useAnimate from '../../../../../common/hooks/useAnimate';
import { log } from 'util';
import usePrevious from '../../../../../common/hooks/usePrevious';

const playersColorsFill: { joystick: string, cable: string, background: string }[] = [
  { joystick: '#0d50ff', cable: '#4991e1', background: '#9DCAFD' },
  { joystick: '#FF6F89', cable: '#FDAAC6', background: '#FFDFE4' },
  { joystick: '#29D855', cable: '#90E3A5', background: '#D8FFE2' },
  { joystick: '#F7A62B', cable: '#F3C274', background: '#FFFADB' },
];

const Players: React.FC<{ numberOfPlayers: number }> = ({ numberOfPlayers }) => {
  const prevNumberOfPlayers = usePrevious(numberOfPlayers);
  // const [isReadyToUnmount, setIsReadyToUnmount] = useState(
  //   new Array(playersColorsFill.length).fill(false).map((_, index) => index >= numberOfPlayers)
  // );

  // useEffect(() => {
  //   console.log({numberOfPlayers});
  //   if (numberOfPlayers < 1 || numberOfPlayers > 4) {
  //     console.warn(`number of players must be between 1 and 4 (included), got ${numberOfPlayers}`);
  //     return;
  //   }
  //
  //   if (prevNumberOfPlayers === numberOfPlayers) {
  //     return;
  //   }
  //
  //   if (prevNumberOfPlayers < numberOfPlayers) {
  //     setIsReadyToUnmount((prev) => {
  //       const updated = [...prev];
  //
  //       for (let i = prevNumberOfPlayers; i < numberOfPlayers; i++) {
  //         updated[i] = false;
  //       }
  //
  //       return updated;
  //     })
  //   }
  //
  // }, [prevNumberOfPlayers, numberOfPlayers]);

  return <div className={styles.playerContainer}>
    {playersColorsFill.map(({ joystick, cable, background }, index) => {
      return <Player
        key={index}
        show={index < numberOfPlayers}
        index={index}
        joystickFill={joystick}
        cableFill={cable}
        background={background}

        // isAboutToUnmount={index >= numberOfPlayers}
        // setIsReadyToUnmount={(value) => setIsReadyToUnmount((prev) => {
        //   const updated = [...prev];

        // updated[index] = value;

        // return updated;
        // })}

        className={`${styles.flexItem} ${index > prevNumberOfPlayers ? styles.oldItem : styles.newItem}`}
      />;
      // }

      // console.log('unmount', { index, numberOfPlayers, readyToUnmount: isReadyToUnmount[index] });
      // return null;
    })}

  </div>;
}

export default Players;
