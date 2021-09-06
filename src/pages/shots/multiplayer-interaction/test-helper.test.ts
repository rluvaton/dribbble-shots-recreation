import { bool, build, fake } from '@jackfranklin/test-data-bot';
import { PlayerProps } from './components/Player';
import { JoystickIconProps } from './components/JoystickIcon';

export const playerPropsBuilder = build<PlayerProps>('PlayerProps', {
  fields: {
    show: bool(),
    animate: bool(),
    backgroundColor: fake(f => f.internet.color()),
    cableFill: fake(f => f.internet.color()),
    joystickFill: fake(f => f.internet.color()),
  },
});

export const joystickIconPropsBuilder = build<JoystickIconProps>('JoystickIconProps', {
  fields: {
    animationProgress: fake(f => {
      // Unfortunately test-data-bot use old version of `faker`,
      // so until https://github.com/jackfranklin/test-data-bot/issues/487 resolve we need to use the deprecated method
      // noinspection JSDeprecatedSymbols
      return f.random.number(100);
    }),
    joystickFill: fake(f => f.internet.color()),
    cableFill: fake(f => f.internet.color()),
    backgroundColor: fake(f => f.internet.color()),
  },
});


describe('multiplayer-interaction test helper', () => {
  describe('playerPropsBuilder', () => {
    it('should be defined', () => {
      expect(playerPropsBuilder).toBeDefined();
    });
  });

  describe('joystickIconPropsBuilder', () => {
    it('should be defined', () => {
      expect(joystickIconPropsBuilder).toBeDefined();
    });
  });
})

