import React, { useEffect, useState } from 'react';
import Player from '../Player';
import styles from './index.module.scss';

const playersColorsFill: { joystick: string, cable: string, background: string }[] = [
  { joystick: '#0d50ff', cable: '#4991e1', background: '#9DCAFD' },
  { joystick: '#FF6F89', cable: '#FDAAC6', background: '#FFDFE4' },
  { joystick: '#29D855', cable: '#90E3A5', background: '#D8FFE2' },
  { joystick: '#F7A62B', cable: '#F3C274', background: '#FFFADB' },
];

const Players: React.FC<{ numberOfPlayers: number }> = ({ numberOfPlayers }) => {
  const [joystickPlayersColors, setJoystickPlayersColors] = useState(playersColorsFill.slice(0, numberOfPlayers));

  useEffect(() => {
    if (numberOfPlayers < 1 || numberOfPlayers > 4) {
      console.warn(`number of players must be between 1 and 4 (included), got ${numberOfPlayers}`);
      return;
    }

    setJoystickPlayersColors(playersColorsFill.slice(0, numberOfPlayers));
  }, [numberOfPlayers]);


  return (
    <div className={styles.playerContainer}>
      {joystickPlayersColors.map(({ joystick, cable, background }, index) =>
        <Player key={index} joystickFill={joystick} cableFill={cable} background={background}/>,
      )}
    </div>
  );
}

export default Players;
