import React from 'react';
import { render, screen } from '@testing-library/react';
import ShotPreview from './';
import { Shot } from '../../../../common/interfaces/shot';
import { shotBuilder } from '../../../../test-helpers/entities-builders';

describe('ShotPreview', () => {
  it('should render the component and contain the shot name, description, link, originalShotLink and component', () => {
    // Arrange
    const shotComponentTestId = 'shot-component';
    const shot: Shot = shotBuilder({
      overrides: {
        component: <div data-testid={shotComponentTestId}/> as any,
      },
    });

    // Act
    const { container } = render(<ShotPreview {...shot}/>);

    // Assert
    screen.getByText(shot.name);
    screen.getByText(shot.description as string);
    screen.getByTestId(shotComponentTestId);

    // Check that all the links exists
    const allLinkElements = container.querySelectorAll('[href]');
    const links = Array.from(allLinkElements).map((linkElement: { href?: string } & any) => linkElement.href);

    // The component link and the original shot link
    expect(allLinkElements).toHaveLength(2);
    expect(links).toContain(`${window.location.origin}/${shot.link}`);
    expect(links).toContain(shot.originalShotLink);
  });
});
