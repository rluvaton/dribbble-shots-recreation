import React from 'react';
import { render, screen } from '@testing-library/react';
import JoystickIcon, { _internalTesting } from './';
import * as faker from 'faker';


describe('JoystickIcon', () => {

  it('should render the component with the passed controller fill and cableFill', () => {
    // Arrange
    const joystickFill = faker.internet.color();
    const cableFill = faker.internet.color();

    // Act
    render(<JoystickIcon joystickFill={joystickFill} cableFill={cableFill}/>);

    // Assert
    const joystickPath = screen.getByTestId(_internalTesting.testId.joystickPath);
    const cablePath = screen.getByTestId(_internalTesting.testId.cablePath);

    expect(joystickPath).toHaveStyle({ fill: joystickFill });
    expect(cablePath).toHaveStyle({ fill: cableFill });
  });

});
