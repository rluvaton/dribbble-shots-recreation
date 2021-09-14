import { toOnlyBeCalledWith } from './jest-helpers';
import faker from 'faker';

describe('Jest Helpers', () => {
  describe('toOnlyBeCalledWith', () => {
    it('should throw if passing a non-mocked function', () => {
      // Arrange
      const passedFn = () => {
      };

      // Act
      // @ts-expect-error We don't pass mock function on purpose
      const shouldThrowFn = () => toOnlyBeCalledWith(passedFn, []);

      // Assert
      expect(shouldThrowFn).toThrow();
    });

    it('should not throw if passing a mocked function that hasnt been called', () => {
      // Arrange
      const passedFn = jest.fn();

      // Act
      const shouldThrowFn = () => toOnlyBeCalledWith(passedFn, []);

      // Assert
      expect(shouldThrowFn).not.toThrow();
    });

    it('should not throw if passing a mocked function that only been called with the passed args', () => {
      // Arrange
      const passedFn = jest.fn();
      const args = faker.datatype.array(faker.datatype.number({ min: 1, max: 10 }));

      for (let i = 0; i < faker.datatype.number({ min: 1 }); i++) {
        passedFn(...args);
      }

      // Act
      const shouldThrowFn = () => toOnlyBeCalledWith(passedFn, args);

      // Assert
      expect(shouldThrowFn).not.toThrow();
    });

    it('should throw if passing a mocked function that been called with different args than the passed one', () => {
      // Arrange
      const passedFn = jest.fn();
      const realArgs = faker.datatype.array();
      const args = faker.datatype.array();

      for (let i = 0; i < faker.datatype.number({ min: 1 }); i++) {
        passedFn(...realArgs);
      }

      // Act
      const shouldThrowFn = () => toOnlyBeCalledWith(passedFn, args);

      // Assert
      expect(shouldThrowFn).toThrow();
    });

    it('should throw if passing a mocked function that been called with passed args and different args', () => {
      // Arrange
      const passedFn = jest.fn();
      const args = faker.datatype.array();

      passedFn(...faker.datatype.array());

      for (let i = 0; i < faker.datatype.number({ min: 1 }); i++) {
        passedFn(...args);
      }

      // Act
      const shouldThrowFn = () => toOnlyBeCalledWith(passedFn, args);

      // Assert
      expect(shouldThrowFn).toThrow();
    });
  });
});
