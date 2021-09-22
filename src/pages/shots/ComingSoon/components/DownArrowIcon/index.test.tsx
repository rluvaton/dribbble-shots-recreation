import DownArrowIcon from './';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('DownArrowIcon', () => {
  it('should be defined', () => {
    expect(DownArrowIcon).toBeDefined();
  });

  it('should have "img" role and "down arrow" title', () => {

    // Act
    render(<DownArrowIcon/>);

    // Assert
    screen.getByTitle('down arrow');
    screen.getByRole('img');
  });
});
