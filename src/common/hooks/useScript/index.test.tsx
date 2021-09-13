import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import useScript, { ScriptLoadingState } from './';

describe('useScript', () => {
  let scriptUrl: string;

  function Example({shouldLoadImmediately = false}: { shouldLoadImmediately?: boolean }) {
    const { scriptLoadingState, setShouldLoad } = useScript(scriptUrl, shouldLoadImmediately);

    return (
      <div>
        <span>{scriptLoadingState}</span>
        <button onClick={() => setShouldLoad(true)}>Load</button>
      </div>
    );
  }

  beforeEach(() => {
    scriptUrl = faker.internet.url() + '.js';
  })

  it(`should should not find a script tag when setShouldLoad hasn't called yet and shouldLoadImmediately is false and the current script loading state is 'unloaded'`, async () => {
    // Act
    const { baseElement } = render(<Example/>);

    // Assert
    screen.getByText(ScriptLoadingState.UNLOADED);

    // No scripts tags has been loaded
    const scriptTags = baseElement.querySelectorAll('script');
    expect(scriptTags).toHaveLength(0);
  });

  describe(`update script loading state to ${ScriptLoadingState.LOADING}`, () => {
    it('when shouldLoadImmediately = true', async () => {
      // Act
      render(<Example shouldLoadImmediately={true}/>);

      // Assert
      await screen.findByText(ScriptLoadingState.LOADING);
    });

    it('when shouldLoadImmediately = false and clicking the load button', async () => {
      // Arrange
      render(<Example shouldLoadImmediately={false}/>);

      const loadButton = screen.getByText('Load');

      // Act
      // Must wrap in `act` so the click will actually create the script tag
      act(() => userEvent.click(loadButton));

      // Assert
      await screen.findByText(ScriptLoadingState.LOADING)
    });
  });

  describe(`update script loading state to ${ScriptLoadingState.FAILED} when error event fires in script`, () => {
    it('when shouldLoadImmediately = true', async () => {
      // Arrange
      const { baseElement } = render(<Example shouldLoadImmediately={true}/>);
      const scriptTag = baseElement.querySelector('script');

      // Act
      fireEvent.error(scriptTag!)

      // Assert
      await screen.findByText(ScriptLoadingState.FAILED)
    });

    it('when shouldLoadImmediately = false and clicking the load button', async () => {
      // Arrange
      const { baseElement } = render(<Example shouldLoadImmediately={false}/>);

      const loadButton = screen.getByText('Load');

      // Must wrap in `act` so the click will actually create the script tag
      act(() => userEvent.click(loadButton));

      const scriptTag = baseElement.querySelector('script');

      // Act
      fireEvent.error(scriptTag!)

      // Assert
      await screen.findByText(ScriptLoadingState.FAILED)
    });
  });

  describe(`update script loading state to ${ScriptLoadingState.LOADED} when load event fires in script`, () => {
    it('when shouldLoadImmediately = true', async () => {
      // Arrange
      const { baseElement } = render(<Example shouldLoadImmediately={true}/>);
      const scriptTag = baseElement.querySelector('script');

      // Act
      fireEvent.load(scriptTag!)

      // Assert
      await screen.findByText(ScriptLoadingState.LOADED)
    });

    it('when shouldLoadImmediately = false and clicking the load button', async () => {
      // Arrange
      const { baseElement } = render(<Example shouldLoadImmediately={false}/>);

      const loadButton = screen.getByText('Load');

      // Must wrap in `act` so the click will actually create the script tag
      act(() => userEvent.click(loadButton));

      const scriptTag = baseElement.querySelector('script');

      // Act
      fireEvent.load(scriptTag!)

      // Assert
      await screen.findByText(ScriptLoadingState.LOADED)
    });
  });

  it.todo('should remove the previous script tag when the url changed');
});
