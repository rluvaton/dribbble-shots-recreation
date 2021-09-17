import React, { useEffect, useRef, useState } from 'react';
import JoystickIcon from '../JoystickIcon';
import styles from './index.module.scss';
import anime from 'animejs';
import { toggle } from '../../../../../common/helpers/animation';

export interface PlayerProps {
  show: boolean;
  animate: boolean;

  joystickFill: string;
  cableFill: string;
  backgroundColor: string;
}

const Player: React.FC<PlayerProps> = ({ show, joystickFill, cableFill, backgroundColor, animate }) => {

  const [animationProgress, setAnimationProgress] = useState(show ? 100 : 0);
  const animationProgressObj = useRef({ value: animationProgress });

  const animation = useRef(anime({
    targets: animationProgressObj.current,

    // 0   - closed
    // 100 - open
    value: [0, 100],
    direction: 'normal',
    autoplay: false,
    duration: 450,
    easing: 'cubicBezier(0.83, 0, 0.4, 0.99)',
    update: () => setAnimationProgress(animationProgressObj.current.value),
  }));

  useEffect(() => {
    if (!animate) {
      return;
    }

    // If shouldn't show and it's the first time
    if (!show && !animation.current.began) {
      return;
    }

    toggle(animation.current, (value) => animationProgressObj.current.value = value);
  }, [animate, show]);

  return (
    <div
      data-testid="player"
      className={styles.player}
      style={{ backgroundColor, flex: `${animationProgress}%` }}
    >
      <JoystickIcon animationProgress={animationProgress}
                    joystickFill={joystickFill}
                    cableFill={cableFill}
                    backgroundColor={backgroundColor}/>
    </div>
  );
};

export default Player;
