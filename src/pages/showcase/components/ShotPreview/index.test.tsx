import React from 'react';
import { render, screen } from '@testing-library/react';
import ShotPreview from './';
import { Shot } from '../../../../common/interfaces/shot';
import faker from 'faker';

describe('ShotPreview', () => {
  it('should render the component and contain the shot name, description, link, originalShotLink and component', () => {
    // Arrange
    const shotComponentTestId = 'shot-component';
    const shot: Shot = {
      name: faker.name.title(),
      id: faker.datatype.uuid(),
      component: <div data-testid={shotComponentTestId}/>,
      description: faker.lorem.lines(1),
      link: faker.internet.url(),
      originalShotLink: faker.internet.url(),
    }

    // Act
    const { container } = render(<ShotPreview {...shot}/>);

    // Assert
    expect(screen.queryByText(shot.name)).toBeInTheDocument();
    expect(screen.queryByText(shot.description as string)).toBeInTheDocument();
    expect(screen.queryByTestId(shotComponentTestId)).toBeInTheDocument();
    expect(screen.queryByTestId(shotComponentTestId)).toBeInTheDocument();

    const allLinkElements = container.querySelectorAll('[href]');
    const links = Array.from(allLinkElements).map((linkElement: {href?: string} & any) => linkElement.href);

    // The component link and the original shot link
    expect(allLinkElements).toHaveLength(2);
    expect(links).toContain(`${shot.link}/`);
    expect(links).toContain(`${shot.originalShotLink}/`);
  });
});
