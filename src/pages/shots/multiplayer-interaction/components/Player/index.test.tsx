import React from 'react';
import Player from './';
import { render, screen } from '@testing-library/react';
import { playerPropsBuilder } from '../../test-helper.test';
import { overrideTestDataBotWithFalsyValue } from '../../../../../test-helpers/entities-builders';


describe('Player', () => {
  it('should be defined', () => {
    expect(Player).toBeDefined();
  });

  it('should have flex: 0% (not visible) and the background color when passing show=false and animate=false in the props', () => {
    // Arrange
    const props = playerPropsBuilder({
      overrides: {
        show: overrideTestDataBotWithFalsyValue(false),
        animate: overrideTestDataBotWithFalsyValue(false),
      },
    });

    // Act
    render(<Player {...props}/>);

    // Assert
    const player = screen.getByTestId('player');

    // We couldn't use `.not.toBeVisible();` because it not render the DOM to see that it's not really visible
    expect(player).toHaveStyle({
      flex: '0%',
      backgroundColor: props.backgroundColor,
    })
  });

  it('should have flex: 100% (visible) and the background color when passing show=true and animate=false in the props', () => {
    // Arrange
    const props = playerPropsBuilder({
      overrides: {
        show: true as any,
        animate: false as any,
      },
    });

    // Act
    render(<Player {...props}/>);

    // Assert
    const player = screen.getByTestId('player');

    // We couldn't use `.not.toBeVisible();` because it not render the DOM to see that it's not really visible
    expect(player).toHaveStyle({
      flex: '100%',
      backgroundColor: props.backgroundColor,
    })
  });
});
