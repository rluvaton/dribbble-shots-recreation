import React from 'react';
import { Shot } from '../../../common/interfaces/shot';
import JoystickIcon from './components/JoystickIcon';

const MultiPlayerInteraction: React.FC = () => {
  return (
    <div>
      <JoystickIcon joystickFill="#0d50ff" cableFill="#4991e1"/>
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
