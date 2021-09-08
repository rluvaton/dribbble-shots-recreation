import React from 'react';
import { render, screen } from '@testing-library/react';
import PageRoute from './';
import * as faker from 'faker';
import { MemoryRouter as Router } from 'react-router-dom';

describe('PageRoute', () => {

  it('should render the route and set the title', () => {
    // Arrange
    const prevTitle = document.title;
    const expectedTitle = faker.lorem.words(3);
    const routeTextContent = 'Hello World';

    // Act
    render(<PageRoute path="*" title={expectedTitle}><span>{routeTextContent}</span></PageRoute>, {wrapper: Router});

    // Assert
    screen.getByText(routeTextContent);

    expect(document.title).toEqual(expectedTitle);
    expect(document.title).not.toEqual(prevTitle);
  });


});
