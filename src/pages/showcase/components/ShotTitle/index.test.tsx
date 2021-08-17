import React from 'react';
import { render, screen } from '@testing-library/react';
import ShotTitle from './';
import { Shot } from '../../../../common/interfaces/shot';

test('renders learn react link', () => {
  const shot: Shot = {
    id: 'test id',
    name: 'test name',
    component: <></>,
  }
  render(<ShotTitle {...shot}/>);
  const linkElement = screen.getByText(/test id/i);
  expect(linkElement).toBeInTheDocument();
});
