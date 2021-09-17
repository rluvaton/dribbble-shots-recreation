import ShotContainer from './';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { shotBuilder } from '../../../test-helpers/entities-builders';
import { Shot } from '../../../common/interfaces/shot';
import { getAllHrefInContainer } from '../../../test-helpers/utils';

describe('ShotContainer', () => {
  it('should be defined', () => {
    expect(ShotContainer).toBeDefined();
  });

  it('should render the component and display the author name and the dribbble icon', () => {
    // Arrange
    const shotComponentTestId = 'shot-component';
    const shot: Shot = shotBuilder({
      overrides: {
        createComponent: (() => <div data-testid={shotComponentTestId}/>) as any,
      },
    });

    // Act
    const {container } = render(<ShotContainer shot={shot} />);

    // Assert
    screen.getByTestId(shotComponentTestId);

    screen.getByText(shot.author.name);

    const links = getAllHrefInContainer(container);
    expect(links).toIncludeSameMembers([shot.author.link, shot.originalShotLink]);
  });
});
