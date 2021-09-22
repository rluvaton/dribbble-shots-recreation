import NavBar from './';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('NavBar', () => {
  it('should be defined', () => {
    expect(NavBar).toBeDefined();
  });

  it('should have "navigation" role', () => {
    // Act
    render(<NavBar/>);

    // Assert
    screen.getByRole('navigation');
  });

  it('should have 4 children for the navigation', () => {
    // Act
    render(<NavBar/>);

    // Assert
    const navBar = screen.getByRole('navigation');
    expect(navBar.children).toHaveLength(4);
  });

  it('should have "How soon", "About", "Features" and "Contacts" items and only "How soon" should have data-selected="true" attribute', () => {
    // Act
    render(<NavBar/>);

    // Assert
    const howSoonEl = screen.getByText('How soon');
    expect(howSoonEl).toHaveAttribute('data-selected', 'true');

    const unselectedMenuElements = [
      screen.getByText('About'),
      screen.getByText('Features'),
      screen.getByText('Contacts'),
    ];

    unselectedMenuElements.forEach((item) => expect(item).not.toHaveAttribute('data-selected'))
  });
});
