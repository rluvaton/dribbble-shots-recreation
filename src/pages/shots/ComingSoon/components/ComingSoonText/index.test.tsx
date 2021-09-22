import ComingSoonText from './';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import faker from 'faker';
import { restoreJestTimers } from '../../../../../test-helpers/jest-helpers';

describe('ComingSoonText', () => {

  function getActualComingSoonTextElements() {
    const comingSoonActualTextElements = screen.getAllByText('COMING SOON');
    expect(comingSoonActualTextElements).toHaveLength(2);

    const [behindText, progressText] = comingSoonActualTextElements;

    return {
      behindText,
      progressText,
    };
  }

  beforeEach(() => jest.useFakeTimers());
  afterEach(() => restoreJestTimers());

  it('should be defined', () => {
    expect(ComingSoonText).toBeDefined();
  });

  it('should display COMING SOON in ALL CAPS before and after running timers', () => {
    // Arrange
    const progress = faker.datatype.number(100);

    // Act
    render(<ComingSoonText progress={progress}/>);

    // Assert
    getActualComingSoonTextElements();

    act(() => {
      jest.runAllTimers();
    });

    getActualComingSoonTextElements();
  });

  it('when progress is 0 the text above should have width: 0 and aria-valuenow: 0', () => {
    // Arrange
    const progress = 0;

    // Act
    render(<ComingSoonText progress={progress}/>);

    act(() => {
      jest.runAllTimers();
    });

    // Assert
    const { behindText, progressText } = getActualComingSoonTextElements();

    expect(behindText).toHaveStyle({
      width: 'fit-content',
    });

    expect(progressText).toHaveStyle({
      width: '0%',
    });

    expect(progressText).toHaveAttribute('aria-valuenow', progress + '');
  });

  it('when progress is greater than 0 than the text above should have width: 0 and then after timeout the width with the progress', () => {
    // Arrange
    const progress = faker.datatype.number({ min: 1, max: 100 });

    // Act
    render(<ComingSoonText progress={progress}/>);

    // Assert
    const { progressText } = getActualComingSoonTextElements();

    expect(progressText).toHaveStyle({
      width: '0%',
    });
    expect(progressText).toHaveAttribute('aria-valuenow', progress + '');

    // Act (again)
    // We need to trigger the progress update
    act(() => {
      jest.runAllTimers();
    });

    // Assert
    expect(progressText).toHaveStyle({
      width: `${progress}%`,
    });
    expect(progressText).toHaveAttribute('aria-valuenow', progress + '');
  });
});
