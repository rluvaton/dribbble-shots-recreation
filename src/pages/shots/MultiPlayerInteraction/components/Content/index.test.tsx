import Content, { ContentProps } from './';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';


function getNumberOfPlayersFakeImpl(numberOfPlayers: number): Pick<ContentProps, 'numberOfPlayers' | 'setNumberOfPlayers'> {
  const numberOfPlayersObj: any = {
    numberOfPlayers,
  }

  numberOfPlayersObj.setNumberOfPlayers = jest.fn((fnOrNumber: Function | number) => {
    numberOfPlayersObj.numberOfPlayers = typeof fnOrNumber === 'function' ? fnOrNumber(numberOfPlayers) : fnOrNumber;
  });

  return numberOfPlayersObj;
}

describe('Content', () => {

  it('should be defined', () => {
    expect(Content).toBeDefined();
  });

  it('should display "Number of Players"', () => {
    const props = getNumberOfPlayersFakeImpl(1);

    // Act
    render(<Content {...props}/>);

    // Assert
    screen.getByText('Number of Players');
  });

  it('should display the passed number of players', () => {
    // Arrange
    const props = getNumberOfPlayersFakeImpl(1);

    // Act
    render(<Content {...props}/>);

    // Assert
    screen.getByText(props.numberOfPlayers);
  });

  it('should not call setNumberOfPlayers when not clicking anything', () => {
    // Arrange
    const props = getNumberOfPlayersFakeImpl(1);

    // Act
    render(<Content {...props}/>);

    // Assert
    expect(props.setNumberOfPlayers).toHaveBeenCalledTimes(0);
  });

  it('should not call setNumberOfPlayers when clicking the + when the number of players are the max (4)', () => {
    // Arrange
    const props = getNumberOfPlayersFakeImpl(4);

    render(<Content {...props}/>);

    const plusIcon = screen.getByTestId('plus');

    // Act
    act(() => userEvent.click(plusIcon));

    // Assert
    expect(props.setNumberOfPlayers).toHaveBeenCalledTimes(0);
  });

  it('should not call setNumberOfPlayers when clicking the + or - when preview is true and both icons should have disabled class', () => {
    // Arrange
    const props = getNumberOfPlayersFakeImpl(2);

    render(<Content {...props} preview/>);

    const plusIcon = screen.getByTestId('plus');
    const minusIcon = screen.getByTestId('minus');

    // Act
    act(() => userEvent.click(plusIcon));
    act(() => userEvent.click(minusIcon));

    // Assert
    expect(props.setNumberOfPlayers).toHaveBeenCalledTimes(0);
    expect(plusIcon).toHaveAttribute('class', 'plusIcon disabled');
    expect(minusIcon).toHaveAttribute('class', 'minusIcon disabled');
  });

  it('should not call setNumberOfPlayers when clicking the - when the number of players are the min (1) and the minus icon should have disabled class', () => {
    // Arrange
    const props = getNumberOfPlayersFakeImpl(1);

    render(<Content {...props}/>);

    const minusIcon = screen.getByTestId('minus');

    // Act
    act(() => userEvent.click(minusIcon));

    // Assert
    expect(props.setNumberOfPlayers).toHaveBeenCalledTimes(0);
    expect(minusIcon).toHaveAttribute('class', 'minusIcon disabled');
  });

  it(`should call setNumberOfPlayers when clicking the + with the new number of players and the plus icon shouldn't have disabled class`, () => {
    // Arrange
    const props = getNumberOfPlayersFakeImpl(1);

    render(<Content {...props}/>);
    const plusIcon = screen.getByTestId('plus');

    // Act
    act(() => userEvent.click(plusIcon));

    // Assert
    expect(props.setNumberOfPlayers).toHaveBeenCalledTimes(1);
    expect(props.numberOfPlayers).toEqual(2);
    expect(plusIcon).toHaveAttribute('class', 'plusIcon');
  });

  it('should call setNumberOfPlayers when clicking the - with the new number of players when the initial number of players is greater than 1', () => {
    // Arrange
    const initialNumberOfPlayers = faker.datatype.number({ min: 2, max: 4 });
    const props = getNumberOfPlayersFakeImpl(initialNumberOfPlayers);

    render(<Content {...props}/>);

    const minusIcon = screen.getByTestId('minus');

    // Act
    act(() => userEvent.click(minusIcon));

    // Assert
    expect(props.setNumberOfPlayers).toHaveBeenCalledTimes(1);
    expect(props.numberOfPlayers).toEqual(initialNumberOfPlayers - 1);
  });

  it(`should add to minus icon disabled class after reaching the minimum (1)`, () => {
    // Arrange
    const props = getNumberOfPlayersFakeImpl(2);
    const getElement = () => <Content {...props}/>;

    const { rerender } = render(getElement());

    const minusIcon = screen.getByTestId('minus');
    const classNameBeforeClickingMinus = minusIcon.getAttribute('class');

    // Act
    act(() => userEvent.click(minusIcon));

    // According to React testing library, this is how you update props
    // See https://testing-library.com/docs/example-update-props/
    rerender(getElement());

    // Assert
    expect(props.setNumberOfPlayers).toHaveBeenCalledTimes(1);
    expect(props.numberOfPlayers).toEqual(1);
    expect(classNameBeforeClickingMinus).toEqual('minusIcon');
    expect(minusIcon).toHaveAttribute('class', 'minusIcon disabled');
  });

  it(`should add to plus icon disabled class after reaching the maximum (4)`, () => {
    // Arrange
    const props = getNumberOfPlayersFakeImpl(3);
    const getElement = () => <Content {...props}/>;

    const { rerender } = render(getElement());

    const plusIcon = screen.getByTestId('plus');
    const classNameBeforeClickingPlus = plusIcon.getAttribute('class');

    // Act
    act(() => userEvent.click(plusIcon));

    // According to React testing library, this is how you update props
    // See https://testing-library.com/docs/example-update-props/
    rerender(getElement());

    // Assert
    expect(props.setNumberOfPlayers).toHaveBeenCalledTimes(1);
    expect(props.numberOfPlayers).toEqual(4);
    expect(classNameBeforeClickingPlus).toEqual('plusIcon');
    expect(plusIcon).toHaveAttribute('class', 'plusIcon disabled');
  });
});
