import React from 'react';
import { render, screen } from '@testing-library/react';
import type ShowcasePageType from './';
import { Shot } from '../../common/interfaces/shot';
import * as faker from 'faker';
import { shotBuilder } from '../../test-helpers/entities-builders';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ShowcasePage', () => {

  function mockShotsAndGetComponent(mockAllShots: Shot[]): typeof ShowcasePageType {
    jest.mock('../shots', () => ({ allShots: mockAllShots }));

    // the shots
    let shotsMock: jest.Mock;

    // Must use isolateModules because we need to require a new module everytime so it will use the new shots mock
    jest.isolateModules(() => {
      shotsMock = require('./').default;
    });


    // @ts-ignore assert the shotsMock (TS screams about using variable before initialisation
    // If for some reason the behavior will change we can do a workaround by putting the whole test function inside the isolateModules
    // Or we can also return a Promise and the resolve callback will be called with the shotsMock in the isolateModules function
    expect(shotsMock).toBeDefined();

    // @ts-ignore the shotsMock must be defined as we assert it
    return shotsMock;
  }

  it('should render the page', () => {
    // Arrange
    const shots: Shot[] = [];


    const ShowcasePage = mockShotsAndGetComponent(shots);

    // Act
    render(<ShowcasePage/>);

    // Assert
    const shotTitleElement = screen.queryByText('Showcase');

    expect(shotTitleElement).toBeInTheDocument();
  });

  it('should render the page and display the shot components', () => {
    // Arrange
    const getShotComponentTestId = ({ id }: Shot) => `shot-${id}`;

    const shots: Shot[] = faker.datatype.array().map(() =>
      shotBuilder({
        // @ts-ignore TypeScript scream about the return type, but this is done exactly as in the docs and it works
        map: (shot: ShotWithDataTestId) => {
          shot.createComponent = () => <span data-testid={getShotComponentTestId(shot)}>Hello from shot {shot.id}</span>
          return shot;
        },
      }),
    );

    const ShowcasePage = mockShotsAndGetComponent(shots);

    // Act
    render(<ShowcasePage/>, {wrapper: Router});

    // Assert
    screen.getByText('Showcase');
    shots.forEach(shot => screen.getByTestId(getShotComponentTestId(shot)));
  });

});
