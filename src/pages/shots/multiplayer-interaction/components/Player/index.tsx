import React from 'react';
import JoystickIcon from '../JoystickIcon';
import styles from './index.module.scss';

interface PlayerProps {
  joystickFill: string,
  cableFill: string,
  background: string
}

const Player: React.FC<PlayerProps> = ({ joystickFill, cableFill, background }) => {
  return (
    <div className={styles.player} style={{ background }}>
      <JoystickIcon joystickFill={joystickFill} cableFill={cableFill}/>,
    </div>
  );
}

export default Player;
