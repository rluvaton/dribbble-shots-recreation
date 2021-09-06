import Players from './';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Players', () => {
  it('should be defined', () => {
    expect(Players).toBeDefined();
  });

  it('should render only 4 players', () => {
    // Act
    render(<Players numberOfPlayers={1}/>);

    // Assert
    const players = screen.getAllByTestId('player');

    expect(players).toHaveLength(4);
  });

  it('should show only the first player when number of players is 1', () => {
    // Act
    render(<Players numberOfPlayers={1}/>);

    // Assert
    const [firstPlayer, ...remainingPlayers] = screen.getAllByTestId('player');

    // The first player should be displayed
    expect(firstPlayer).toHaveStyle({
      flex: '100%',
    });

    remainingPlayers.forEach((player) => {
      // The other players should not be displayed
      expect(player).toHaveStyle({
        flex: '0%',
      });
    });
  });

  it('should show all players when number of players are 4', () => {
    // Act
    render(<Players numberOfPlayers={4}/>);

    // Assert
    const players = screen.getAllByTestId('player');

    players.forEach((player) => {
      // The other players should be displayed
      expect(player).toHaveStyle({
        flex: '100%',
      });
    });
  });
});
