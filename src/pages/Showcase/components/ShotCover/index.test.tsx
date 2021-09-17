import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import ShotCover from './';
import * as faker from 'faker';

describe('ShotCover', () => {
  it('should render the passed children', () => {
    // Arrange
    const shotComponentTestId = 'shot-component';
    const component: ReactNode = <span data-testid={shotComponentTestId}>{faker.lorem.paragraph()}</span>;

    // Act
    render(<ShotCover>{component}</ShotCover>);

    // Assert
    screen.getByTestId(shotComponentTestId);
  });
});
