import React from 'react';
import { render, screen } from '@testing-library/react';
import ShowcasePage from './';

test('renders learn react link', () => {
  render(<ShowcasePage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
