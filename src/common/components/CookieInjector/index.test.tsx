import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type CookieInjectorType from './';
import Cookies from 'js-cookie';
import type * as CookiesLoaderType from './cookies-loader';

function getCookieInjector(): {
  CookieInjector: typeof CookieInjectorType,
  CookiesLoader: typeof CookiesLoaderType,
} {
  let CookieInjector: typeof CookieInjectorType | undefined = undefined;
  let CookiesLoader: typeof CookiesLoaderType | undefined = undefined;

  // Must use isolateModules because we need to require a new module everytime
  jest.isolateModules(() => {
    // Required so the CookieNotice (inside CookieInjector) won't fail as it uses the window.matchMedia
    // If we import/require it regularly once a new error will happen:
    // `TypeError: Cannot read property 'matches' of undefined`
    require('../../../test-helpers/mocks/window/match-media');

    CookieInjector = require('./').default;
    CookiesLoader = require('./cookies-loader');

    jest.spyOn(CookiesLoader!, 'load').mockImplementation();
    jest.spyOn(CookiesLoader!, 'unload').mockImplementation();
  });

  expect(CookieInjector).toBeDefined();
  expect(CookiesLoader).toBeDefined();

  return {
    CookieInjector: CookieInjector!,
    CookiesLoader: CookiesLoader!
  };
}

describe('CookieInjector', () => {

  beforeEach(() => {
    // Delete all cookies between each run
    Object.keys(Cookies.get()).forEach((key) => Cookies.remove(key));
  });

  it('should not add a script tag when not clicking at anything and Accept should be visible', () => {
    // Arrange
    const { CookieInjector, CookiesLoader } = getCookieInjector();

    const spiedLoadInCookieLoader = jest.spyOn(CookiesLoader, 'load');

    // Act
    const { baseElement } = render(<CookieInjector/>);

    // Assert
    const acceptButton = screen.queryByText('Accept');
    expect(acceptButton).toBeVisible();

    const scriptTags = baseElement.querySelectorAll('script');
    expect(scriptTags).toHaveLength(0);

    expect(spiedLoadInCookieLoader).not.toHaveBeenCalled();
  });

  it('should have the Accept button and when clicking Accept should add the script tag and call load from CookiesLoader and remove the Accept button', () => {
    // Arrange
    const { CookieInjector, CookiesLoader } = getCookieInjector();
    const spiedLoadInCookieLoader = jest.spyOn(CookiesLoader, 'load');

    const { baseElement, rerender } = render(<CookieInjector/>);

    const prevClickScriptTags = baseElement.querySelectorAll('script');
    const acceptButton = screen.getByText('Accept');

    // Act

    // Assertion here although it breaks the AAA rule as there is nowhere else to put it
    expect(acceptButton).toBeVisible();

    // Must wrap in `act` so the click will actually create the script tag
    act(() => userEvent.click(acceptButton));
    rerender(<CookieInjector/>);

    const afterClickScriptTags = baseElement.querySelectorAll('script');

    // Simulate that the script finish loading
    fireEvent.load(afterClickScriptTags[0]);

    rerender(<CookieInjector/>);

    // Assert
    expect(prevClickScriptTags).toHaveLength(0);
    expect(afterClickScriptTags).toHaveLength(1);

    expect(spiedLoadInCookieLoader).toHaveBeenCalled();

    expect(acceptButton).not.toBeInTheDocument();
  });

  it(`should add the script tag when the 'allow-cookies' cookie is already true and the Accept button should not exist`, async () => {
    // Arrange
    Cookies.set('allow-cookies', 'true');

    const { CookieInjector, CookiesLoader } = getCookieInjector();

    const spiedLoadInCookieLoader = jest.spyOn(CookiesLoader, 'load');
    const spiedUnloadInCookieLoader = jest.spyOn(CookiesLoader, 'unload');

    // Act
    const { baseElement } = render(<CookieInjector/>);

    const scriptTags = baseElement.querySelectorAll('script');

    // Simulate that the script finish loading
    fireEvent.load(scriptTags[0]);

    // Assert
    const acceptButton = screen.queryByText('Accept');
    expect(acceptButton).not.toBeInTheDocument();

    expect(scriptTags).toHaveLength(1);

    expect(spiedLoadInCookieLoader).toHaveBeenCalled();
    expect(spiedUnloadInCookieLoader).not.toHaveBeenCalled();
  });

  it(`should not call load if the script loading state is failed and the 'allow-cookies' cookie exists`, async () => {
    // Arrange
    Cookies.set('allow-cookies', 'true');

    const { CookieInjector, CookiesLoader } = getCookieInjector();

    const spiedLoadInCookieLoader = jest.spyOn(CookiesLoader, 'load');

    // Act
    const { baseElement } = render(<CookieInjector/>);

    const scriptTags = baseElement.querySelectorAll('script');

    // Simulate that the script failed to load loading
    fireEvent.error(scriptTags[0]);

    // Assert
    expect(spiedLoadInCookieLoader).not.toHaveBeenCalled();
  });

  it(`should not call load if the script loading state is still loading and the 'allow-cookies' cookie exists`, async () => {
    // Arrange
    Cookies.set('allow-cookies', 'true');

    const { CookieInjector, CookiesLoader } = getCookieInjector();

    const spiedLoadInCookieLoader = jest.spyOn(CookiesLoader, 'load');

    // Act
    render(<CookieInjector/>);

    // Assert
    expect(spiedLoadInCookieLoader).not.toHaveBeenCalled();
  });

  it(`should remove the script tag and call unload when allow cookie is been removed after it was exists`, async () => {
    // Arrange
    Cookies.set('allow-cookies', 'true');

    const { CookieInjector, CookiesLoader } = getCookieInjector();

    const spiedLoadInCookieLoader = jest.spyOn(CookiesLoader, 'load');
    const spiedUnloadInCookieLoader = jest.spyOn(CookiesLoader, 'unload');

    const { baseElement } = render(<CookieInjector/>);

    const scriptTagsBeforeCookieRemoved = baseElement.querySelectorAll('script');

    // Simulate that the script finish loading
    fireEvent.load(scriptTagsBeforeCookieRemoved[0]);

    // Act
    Cookies.remove('allow-cookies');

    // Wait for the script tag to be removed
    await waitFor(() => {
      const emptyScriptTags = baseElement.querySelectorAll('script');
      expect(emptyScriptTags).toHaveLength(0);
    })

    // Assert
    expect(scriptTagsBeforeCookieRemoved).toHaveLength(1);

    // The `.toHaveBeenCalledAfter` not checking if the expected function called at all
    expect(spiedUnloadInCookieLoader).toHaveBeenCalled();

    // Waiting for jest-extended#292 to get merged so we can remove the casting
    expect(spiedUnloadInCookieLoader).toHaveBeenCalledAfter(spiedLoadInCookieLoader as jest.Mock);
  });

});
