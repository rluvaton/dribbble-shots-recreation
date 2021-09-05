import React from 'react';
import { render, screen } from '@testing-library/react';
import JoystickIcon, { _internalTesting } from './';
import { joystickIconPropsBuilder } from '../../test-helper.test';
import * as faker from 'faker';
import { overrideTestDataBotWithFalsyValue } from '../../../../../test-helpers/entities-builders';


describe('JoystickIcon', () => {

  function getViewBoxWidth(svg: SVGSVGElement): number {
    expect(svg).toHaveAttribute('viewBox');

    const svgViewBox = svg.getAttribute('viewBox');
    expect(typeof svgViewBox).toEqual('string');

    const svgViewBoxParts = svgViewBox!
      // According to MDN The numbers separated by whitespace and/or a comma so we convert it to spaces only
      // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
      .replace(/,/g, ' ')
      .split(' ')
      // Remove extra spaces
      .filter(Boolean);

    expect(svgViewBoxParts).toHaveLength(4);

    // SVG viewBox is in this format: min-x, min-y, width and height
    const svgViewBoxWidth = svgViewBoxParts[2];

    return parseInt(svgViewBoxWidth, 10);
  }

  it('should render the component with the passing joystickFill, cableFill and background colors', () => {
    // Arrange
    const props = joystickIconPropsBuilder();

    // Act
    render(<JoystickIcon {...props} />);

    // Assert
    const joystickPath = screen.getByTestId(_internalTesting.testId.joystickPath);
    const cablePath = screen.getByTestId(_internalTesting.testId.cablePath);
    const buttonsGroup = screen.getByTestId(_internalTesting.testId.buttonsGroup);

    expect(joystickPath).toHaveStyle({ fill: props.joystickFill });
    expect(cablePath).toHaveStyle({ fill: props.cableFill });
    expect(buttonsGroup).toHaveStyle({ fill: props.backgroundColor });
  });

  it('should set the svg viewBox width to be 0 when passing animationProgress=0', () => {
    // Arrange
    const props = joystickIconPropsBuilder({
      overrides: {
        animationProgress: overrideTestDataBotWithFalsyValue(0),
      },
    });


    // Act
    render(<JoystickIcon {...props} />);

    // Assert
    // Make sure that even if the library change this would override the
    expect(props.animationProgress).toEqual(0);

    const svg = screen.getByTestId(_internalTesting.testId.svg) as unknown as SVGSVGElement;

    const svgViewBoxWidth = getViewBoxWidth(svg);

    expect(svgViewBoxWidth).toEqual(0);
  });

  it('should set the svg viewBox width to be greater than 0 when passing animationProgress that is greater than 0', () => {
    // Arrange
    const props = joystickIconPropsBuilder({
      overrides: {
        // using `.datatype.number` as we use newer version of faker which moved the `.number` from `.random` to `.datatype`
        animationProgress: faker.datatype.number({min: 1, max: 100}),
      },
    });


    // Act
    render(<JoystickIcon {...props} />);

    // Assert
    // Make sure that even if the library change this would override the
    expect(props.animationProgress).toBeGreaterThan(0);

    const svg = screen.getByTestId(_internalTesting.testId.svg) as unknown as SVGSVGElement;

    const svgViewBoxWidth = getViewBoxWidth(svg);

    expect(svgViewBoxWidth).toBeGreaterThan(0);
  });

});
