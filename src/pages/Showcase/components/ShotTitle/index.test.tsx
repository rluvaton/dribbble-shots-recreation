import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShotTitle, { ShotTitleProps } from './';
import { Shot } from '../../../../common/interfaces/shot';
import { getAllHrefInContainer } from '../../../../test-helpers/utils';
import { shotBuilder } from '../../../../test-helpers/entities-builders';
import { BrowserRouter as Router } from 'react-router-dom';

const wrapUriWithCurrentUrl = (uri: string) => window.location.origin + uri;

describe('ShotTitle', () => {

  function shotTitleBuilder(...keysToInclude: (keyof ShotTitleProps)[]): ShotTitleProps {

    // If no key to include has been provided, set all keys
    if (keysToInclude.length === 0) {
      keysToInclude = ['name', 'link', 'originalShotLink'];
    }

    return shotBuilder({
      // @ts-ignore TypeScript scream about the return type, but this is done exactly as in the docs and it works
      map: (shot: Shot) => {
        return (keysToInclude.reduce((shotTitle, key) => ({ ...shotTitle, [key]: shot[key] }), {}));
      },
    })
  }

  it('should render the component and contain the shot.name', () => {
    // Arrange
    const shot = shotTitleBuilder('name');

    // Act
    const { container } = render(<ShotTitle {...shot}/>);

    // Assert
    screen.getByText(shot.name);

    const allLinkElements = getAllHrefInContainer(container);
    expect(allLinkElements).toHaveLength(0);
  });

  it('should render the component and contain the shot.name and the link', () => {
    // Arrange
    const shot = shotTitleBuilder('name', 'link');

    // Act
    const { container } = render(<ShotTitle {...shot}/>, { wrapper: Router });

    // Assert
    const titleLinkElement = screen.getByText(shot.name);

    expect(titleLinkElement).toHaveAttribute('href', shot.link);

    const allLinkElements = getAllHrefInContainer(container);
    expect(allLinkElements).toHaveLength(1);
  });

  it(`should display the name's tooltip when hovering over the name`, async () => {
    // Arrange
    const shot = shotTitleBuilder('name', 'link');

    // Act
    const { container } = render(<ShotTitle {...shot}/>, { wrapper: Router });


    // Trigger the tooltip to be displayed
    act(() => userEvent.hover(screen.getByText(shot.name)));

    // Assert
    await expect(
      screen.findByText('Click to enter the component'),
    ).resolves.toBeInTheDocument();

    const allLinkElements = getAllHrefInContainer(container);

    expect(allLinkElements).toHaveLength(1);
    expect(allLinkElements).toContain(wrapUriWithCurrentUrl(shot.link as string));
  });

  it('should render the component and contain the shot.name and the original shot link', () => {
    // Arrange
    const shot = shotTitleBuilder('name', 'originalShotLink');

    // Act
    const { container } = render(<ShotTitle {...shot}/>, { wrapper: Router });

    // Assert
    const allLinkElements = getAllHrefInContainer(container);

    expect(allLinkElements).toHaveLength(1);
    expect(allLinkElements).toContain(shot.originalShotLink);
  });

  it(`should display the original shot link's tooltip when hovering over the original shot link`, async () => {
    // Arrange
    const shot = shotTitleBuilder('name', 'originalShotLink');

    // Act
    const baseDom = render(<ShotTitle {...shot}/>, { wrapper: Router });

    const dribbbleIconLink = baseDom.container.querySelector('[href]');

    // Trigger the tooltip to be displayed
    act(() => userEvent.hover(dribbbleIconLink as Element));

    // Assert
    await expect(
      baseDom.findByText('Original Shot'),
    ).resolves.toBeInTheDocument();

    const allLinkElements = getAllHrefInContainer(baseDom.container);

    expect(allLinkElements).toHaveLength(1);
    expect(allLinkElements).toContain(shot.originalShotLink);
  });

  it('should render the component and contain the shot.name, shot.link and shot.originalShotLink', () => {
    // Arrange
    const shot = shotTitleBuilder();

    // Act
    const { container } = render(<ShotTitle {...shot}/>, { wrapper: Router });

    // Assert
    screen.getByText(shot.name);

    const allLinkElements = getAllHrefInContainer(container);

    expect(allLinkElements).toHaveLength(2);

    expect(allLinkElements).toContain(wrapUriWithCurrentUrl(shot.link as string));
    expect(allLinkElements).toContain(shot.originalShotLink);
  });

  it.todo(`should navigate to the link when pressing the name`);
});
