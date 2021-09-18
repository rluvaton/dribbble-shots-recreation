import ShotContainer from './';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { shotBuilder } from '../../../test-helpers/entities-builders';
import { Shot } from '../../../common/interfaces/shot';
import { getAllHrefInContainer } from '../../../test-helpers/utils';
import { MemoryRouter as Router } from 'react-router-dom';

describe('ShotContainer', () => {
  it('should be defined', () => {
    expect(ShotContainer).toBeDefined();
  });

  it('should render the component and display the author name and the dribbble, github and the home icon', () => {
    // Arrange
    const shotComponentTestId = 'shot-component';
    const shot: Shot = shotBuilder({
      overrides: {
        createComponent: (() => <div data-testid={shotComponentTestId}/>) as any,
      },
    });

    // Act
    const {container } = render(<ShotContainer shot={shot} />, {wrapper: Router});

    // Assert
    screen.getByTestId(shotComponentTestId);

    screen.getByText(shot.author.name);

    const links = getAllHrefInContainer(container);
    expect(links).toHaveLength(4);

    expect(links).toContain(shot.author.link);
    expect(links).toContain(shot.originalShotLink);

    const githubIcon = screen.getByTitle(/github/i);
    expect(githubIcon).toHaveAttribute('href', `https://github.com/rluvaton/dribbble-shots-recreation/tree/main/${shot.directoryPath}`)

    const homeIcon = screen.getByTitle(/home/i);
    expect(homeIcon).toHaveAttribute('href', '/')
  });
});
