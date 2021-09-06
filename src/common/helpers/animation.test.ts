import { toggle } from './animation';
import anime from 'animejs';
import { sleep } from './general';

describe('animation', () => {
  describe('toggle', () => {
    const START = 0;
    const END = 100;

    let animation: anime.AnimeInstance;
    let update: jest.Mock;
    let valueObj: { value: number };

    beforeEach(() => {
      jest.useFakeTimers();

      valueObj = { value: START };

      update = jest.fn();

      animation = anime({
        targets: valueObj,

        value: [START, END],
        direction: 'normal',
        autoplay: false,
        duration: 1000,

        // Save the value when update is been called
        update: () => update({ ...valueObj }),
      });

    });

    afterEach(() => {
      jest.useRealTimers();
      update.mockReset();
    });

    it('should be defined', () => {
      expect(toggle).toBeDefined();
    });

    it('should not start animation when calling toggle on animation that not started yet', () => {
      // Act
      toggle(animation);

      // Assert
      expect(animation.began).toBeFalsy();
      expect(update).not.toBeCalled();

    });

    it('should change the value to END when calling play and finish waiting and then change back to START when calling toggle and finish waiting', async () => {
      // Arrange
      animation.play();
      jest.runAllTimers();

      // Wait for actual finish
      await animation.finished;

      const valueObjAfterFirstFinish = { ...valueObj };

      // Act
      toggle(animation);

      // Wait for actual finish
      await animation.finished;

      // Assert
      expect(valueObjAfterFirstFinish).toEqual({ value: END });
      expect(valueObj).toEqual({ value: START });
    });

    it('should change the value in the direction of END (but not finished) when calling play and then change back to START when calling toggle before finished change to END', async () => {
      // Arrange
      animation.play();

      // Make some progress (using fake timers crated some problems (the obj hasn't updated, so waiting here for real.
      jest.useRealTimers();
      await sleep(100);
      const valueObjAfterSomeTime = { ...valueObj };
      jest.useFakeTimers();

      // Act
      toggle(animation);

      jest.runAllTimers();

      // Wait for actual finish
      await animation.finished;

      // Assert
      expect(valueObjAfterSomeTime.value).toBeGreaterThan(START);
      expect(valueObjAfterSomeTime.value).toBeLessThan(END);
      expect(valueObj).toEqual({ value: START });
    });
  });
});
