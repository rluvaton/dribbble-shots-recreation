import PageIndicator from './';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('PageIndicator', () => {
  it('should be defined', () => {
    expect(PageIndicator).toBeDefined();
  });

  it('pageIndicator should have "menu" role and have 4 children (circles)', () => {
    // Act
    render(<PageIndicator/>);

    // Assert
    const pageIndicator = screen.getByRole('menu');
    expect(pageIndicator.children).toHaveLength(4);
  });

  it('should have 4 circles and each should have have an "img" role and its title', () => {
    // Act
    render(<PageIndicator/>);

    // Assert
    const circlesByTitle = [
      screen.getByTitle('How soon'),
      screen.getByTitle('About'),
      screen.getByTitle('Features'),
      screen.getByTitle('Contacts'),
    ];

    circlesByTitle.forEach(circle => expect(circle).toHaveAttribute('role', 'img'));
  });

  it('should have "How soon", "About", "Features" and "Contacts" titles and only "How soon" should data-selected="true" attribute', () => {
    // Act
    render(<PageIndicator/>);

    // Assert
    const howSoonCircle = screen.getByTitle('How soon');
    expect(howSoonCircle).toHaveAttribute('data-selected', 'true');

    const unselectedPageCircles = [
      screen.getByTitle('About'),
      screen.getByTitle('Features'),
      screen.getByTitle('Contacts'),
    ];

    unselectedPageCircles.forEach((item) => expect(item).not.toHaveAttribute('data-selected'))
  });
});
