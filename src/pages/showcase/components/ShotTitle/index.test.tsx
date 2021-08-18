import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShotTitle, { ShotTitleProps } from './';
import faker from 'faker';

describe('ShotTitle', () => {

  it('should render the component and contain the shot.name', () => {
    // Arrange
    const shot: ShotTitleProps = {
      name: faker.name.title(),
    }

    // Act
    render(<ShotTitle {...shot}/>);

    // Assert
    const shotTitleElement = screen.getByText(shot.name);

    expect(shotTitleElement).toBeInTheDocument();
    expect(shotTitleElement).not.toHaveAttribute('href', shot.link);
  });

  it('should render the component and contain the shot.name and the link', () => {
    // Arrange
    const shot: ShotTitleProps = {
      name: faker.name.title(),
      link: faker.internet.url(),
    }

    // Act
    render(<ShotTitle {...shot}/>);

    // Assert
    const titleLinkElement = screen.getByText(shot.name);

    expect(titleLinkElement).toBeInTheDocument();
    expect(titleLinkElement).toHaveAttribute('href', shot.link);
  });

  it(`should display the name's tooltip when hovering over the name`, async () => {
    // Arrange
    const shot: ShotTitleProps = {
      name: faker.name.title(),
      link: faker.internet.url(),
    }

    // Act
    const baseDom = render(<ShotTitle {...shot}/>);

    // Trigger the tooltip to be displayed
    userEvent.hover(baseDom.getByText(shot.name));

    // Assert
    await expect(
      baseDom.findByText('Click to enter the component'),
    ).resolves.toBeInTheDocument();
  });

  it('should render the component and contain the shot.name and the original shot link', () => {
    // Arrange
    const shot: ShotTitleProps = {
      name: faker.name.title(),
      originalShotLink: faker.internet.url(),
    }

    // Act
    const { container } = render(<ShotTitle {...shot}/>);

    // Assert
    // Search by element containing href
    const originalShotLinkElement = container.querySelector('[href]');

    expect(originalShotLinkElement).toBeInTheDocument();
    expect(originalShotLinkElement).toHaveAttribute('href', shot.originalShotLink);
  });

  it(`should display the original shot link's tooltip when hovering over the original shot link`, async () => {
    // Arrange
    const shot: ShotTitleProps = {
      name: faker.name.title(),
      originalShotLink: faker.internet.url(),
    }

    // Act

    const baseDom = render(<ShotTitle {...shot}/>);

    const dribbbleIconLink = baseDom.container.querySelector('[href]');
    // Trigger the tooltip to be displayed
    userEvent.hover(dribbbleIconLink as Element);

    // Assert
    await expect(
      baseDom.findByText('Original Shot'),
    ).resolves.toBeInTheDocument();
  });

  it('should render the component and contain the shot.name, shot.link and shot.originalShotLink', () => {
    // Arrange
    const shot: ShotTitleProps = {
      name: faker.name.title(),
      link: faker.internet.url(),
      originalShotLink: faker.internet.url(),
    }

    // Act
    const {container} = render(<ShotTitle {...shot}/>);

    // Assert
    const titleLinkElement = screen.getByText(shot.name);

    expect(titleLinkElement).toBeInTheDocument();

    const allLinkElements = container.querySelectorAll('[href]');

    // The component link and the original shot link
    expect(allLinkElements).toHaveLength(2);
  });

});
