import React, { useEffect, useRef, useState } from 'react';
import JoystickIcon from '../JoystickIcon';
import styles from './index.module.scss';
import anime from 'animejs';
import usePrevious from '../../../../../common/hooks/usePrevious';

interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  // Dev
  index: number;

  show: boolean;

  joystickFill: string;
  cableFill: string;
  background: string;
  // isAboutToUnmount: boolean;
  // setIsReadyToUnmount: (isReadyToUnmount: boolean) => void
}

const Player: React.FC<PlayerProps> = ({
                                         index,
                                         show,
                                         joystickFill,
                                         cableFill,
                                         background,
                                         // isAboutToUnmount,
                                         // setIsReadyToUnmount,
                                         className,
                                         style,
                                         ...restHtmlDivProps
                                       }) => {
  const showPrev = usePrevious(show);
  const [shouldRender, setShouldRender] = useState(show);
  const [flex, setFlex] = useState(0);
  const flexObj = useRef({ flex: 0 });

  const [animationIn] = useState(anime({
    targets: flexObj.current,
    flex: ['0%', '100%'],
    direction: 'normal',
    autoplay: false,
    duration: 500,
    easing: 'linear',
    update: () => setFlex(flexObj.current.flex),
  }));

  // const [animationOut] = useState(anime({
  //   targets: flexObj.current,
  //   flex: [100, 1],
  //   direction: 'normal',
  //   autoplay: false,
  //   duration: 500,
  //   easing: 'linear',
  //   update: () => setFlex(flexObj.current.flex),
  // }));

  // useEffect(() => {
  // animation.direction = 'reverse';
  // animation.play();
  // }, [animation]);

  // useEffect(() => {
  //   if (isAboutToUnmount) {
  // animation.restart();
  // animation.reverse();
  // animation.play();
  // animation.finished.finally(() => setIsReadyToUnmount(true));
  // }
  // }, [setIsReadyToUnmount, isAboutToUnmount]);

  useEffect(() => {
    console.log('✅', index);


    return () => console.log('❌', index);
  }, []);

  useEffect(() => {
    let a;
    console.log(flex);
  }, [flex]);


  useEffect(() => {
    console.log(`show changed ${show} | prev ${showPrev}`);
  }, [show]);

  useEffect(() => {

    // If should hide
    if (!show) {

      // First init
      // if (showPrev === undefined) {
      // If first init and it state is hide then don't create any animation
      // return;
      // }


      // If not first init then create exit animation
      flexObj.current.flex = 100;
      animationIn.direction = 'reverse';
      animationIn.play();
      animationIn.finished.finally(() => setShouldRender(false));

      return;
    }

    // If should show
    setShouldRender(true);

  }, [show, showPrev]);

  useEffect(() => {
    if(!shouldRender) {
      return;
    }
    setFlex(0);
    animationIn.direction = 'normal';
    animationIn.play();
  }, [shouldRender])

  return shouldRender ? <div
    className={`${styles.player} ${className || ''}`}
    style={{ background, flex: flex, ...style }}

    {...restHtmlDivProps}
  >
    <JoystickIcon joystickFill={joystickFill} cableFill={cableFill} show={show}/>
  </div> : null;
};

export default Player;
