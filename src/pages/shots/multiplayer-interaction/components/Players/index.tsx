import React from 'react';
import Player from '../Player';
import styles from './index.module.scss';

const playersColorsFill: { joystick: string, cable: string, background: string }[] = [
  { joystick: '#0d50ff', cable: '#4991e1', background: '#9DCAFD' },
  { joystick: '#FF6F89', cable: '#FDAAC6', background: '#FFDFE4' },
  { joystick: '#29D855', cable: '#90E3A5', background: '#D8FFE2' },
  { joystick: '#F7A62B', cable: '#F3C274', background: '#FFFADB' },
];

const Players: React.FC<{ numberOfPlayers: number }> = ({ numberOfPlayers }) => {
  return <div className={styles.playerContainer}>
    {playersColorsFill.map(({ joystick, cable, background }, index) => {
      return <Player
        data-testid="player"
        key={index}

        // Shouldn't animate the first item as it always open
        animate={index !== 0}

        show={index < numberOfPlayers}

        joystickFill={joystick}
        cableFill={cable}
        backgroundColor={background}
      />;
    })}

  </div>;
}

export default Players;
