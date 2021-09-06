import { useState } from 'react';
import usePrevious from './usePrevious';
import { render, screen } from '@testing-library/react';

describe('usePrevious', () => {
  it('should render the previous state and the current state', () => {
    // Arrange
    const prevStateTestId = 'prev-state';
    const currentStateTestId = 'current-state';
    const incrementStateTestId = 'increment-state';

    function Example() {
      const [count, setCount] = useState(0);
      const prevCount = usePrevious(count);

      return (
        <div>
          <span data-testid={prevStateTestId}>{prevCount}</span>
          <span data-testid={currentStateTestId}>{count}</span>
          <button onClick={() => setCount(count + 1)} data-testid={incrementStateTestId}>Increment</button>
        </div>
      );
    }

    // Act
    render(<Example/>);

    // Assert
    const prevStateComponent = screen.getByTestId(prevStateTestId);
    const currStateComponent = screen.getByTestId(currentStateTestId);

    // Because the first value is undefined the text content is nothing so we expect it to not be anything
    expect(prevStateComponent).not.toHaveTextContent(/.+/);
    expect(currStateComponent).toHaveTextContent('0');

    // Increase the count
    const incrementComponent = screen.getByTestId(incrementStateTestId);
    incrementComponent.click()

    expect(prevStateComponent).toHaveTextContent('0');
    expect(currStateComponent).toHaveTextContent('1');
  });
});
