import { act, renderHook } from '@testing-library/react-hooks'
import faker from 'faker';
import type * as Cookies from 'js-cookie';
import type useSingleCookie from './';
import { toOnlyBeCalledWith } from '../../../test-helpers/jest-helpers';


describe('useSingleCookie', () => {

  function mockCookieAndGetHook(mockJsCookieImpl: Partial<typeof Cookies> = {}): typeof useSingleCookie {
    jest.mock('js-cookie', () => mockJsCookieImpl);

    // The hook
    let useSingleCookie: jest.Mock;

    // Must use isolateModules because we need to require a new module everytime so it will use it's own Cookies mock
    jest.isolateModules(() => {
      useSingleCookie = require('./').default;
    });


    // @ts-ignore assert the useSingleCookie (TS screams about using variable before initialisation
    expect(useSingleCookie).toBeDefined();

    // @ts-ignore the useSingleCookie must be defined as we assert it
    return useSingleCookie;
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return undefined when the cookie not exist', () => {
    // Arrange
    const cookieName = faker.name.title();

    // We cast undefined to any because when `get` is called without arguments it should return object,
    // But it always call with arguments (we test it)
    const spiedCookieGet = jest.fn().mockReturnValue(undefined as any);
    const hook = mockCookieAndGetHook({ get: spiedCookieGet });

    // Act
    const { result } = renderHook(
      () => hook({ cookieName }),
    );

    // Trigger some token checks
    act(() => {
      jest.advanceTimersByTime(50_000);
    });

    // Assert
    expect(result.current).toBeUndefined();

    expect(spiedCookieGet).toBeCalledWith(cookieName);
    toOnlyBeCalledWith(spiedCookieGet, [cookieName]);
  });

  it('should return the cookie value when the cookie exist', () => {
    // Arrange
    const cookieName = faker.name.title();
    const cookieValue = faker.name.title();

    const spiedCookieGet = jest.fn().mockReturnValue(cookieValue);
    const hook = mockCookieAndGetHook({ get: spiedCookieGet });

    // Act
    const { result } = renderHook(
      () => hook({ cookieName }),
    );

    // Trigger some token checks
    act(() => {
      jest.advanceTimersByTime(50_000);
    });

    // Assert
    expect(result.current).toEqual(cookieValue);

    expect(spiedCookieGet).toHaveBeenCalled();
    toOnlyBeCalledWith(spiedCookieGet, [cookieName]);
  });

  it('should call parse with the cookie and return the parsed value', () => {
    // Arrange
    const cookieName = faker.name.title();

    const unparsedCookieValue = faker.name.title();
    const parsedCookieValue = unparsedCookieValue + '_parsed';

    const parser = jest.fn((value) => value + '_parsed');

    const spiedCookieGet = jest.fn().mockReturnValue(unparsedCookieValue);
    const hook = mockCookieAndGetHook({ get: spiedCookieGet });

    // Act
    const { result } = renderHook(
      () => hook({ cookieName, parser }),
    );
    // Trigger some token checks
    act(() => {
      jest.advanceTimersByTime(50_000);
    });

    // Assert
    expect(result.current).toEqual(parsedCookieValue);

    expect(spiedCookieGet).toHaveBeenCalled();
    toOnlyBeCalledWith(spiedCookieGet, [cookieName]);

    expect(parser).toHaveBeenCalled();
    toOnlyBeCalledWith(parser, [unparsedCookieValue]);

    expect(spiedCookieGet.mock.calls).toHaveLength(parser.mock.calls.length);
  });

  it('should update the cookie value if detected a new cookie value after timeout', async () => {
    // Arrange
    const cookieName = faker.name.title();
    const prevCookieValue = 'prev cookie value';
    const newCookieValue = 'new cookie value';

    const spiedCookieGet = jest.fn().mockReturnValue(prevCookieValue);
    const hook = mockCookieAndGetHook({ get: spiedCookieGet });

    // Act
    const { result } = renderHook(
      () => hook({ cookieName }),
    );

    const prevCookieValueResult = result.current;

    spiedCookieGet.mockReturnValue(newCookieValue);

    // Trigger some token checks
    act(() => {
      jest.advanceTimersByTime(50_000);
    });

    // Assert
    expect(prevCookieValueResult).toEqual(prevCookieValue);
    expect(result.current).toEqual(newCookieValue);

    expect(spiedCookieGet).toHaveBeenCalled();
    toOnlyBeCalledWith(spiedCookieGet, [cookieName]);
  });

  it('should call isCookiesEquals with the prev and the new cookie and update the cookieValue if they different', async () => {
    // Arrange
    const cookieName = faker.name.title();
    const prevCookieValue = 'PREV';
    const newCookieValue = 'prev1';

    const spiedCookieGet = jest.fn().mockReturnValue(prevCookieValue);
    const hook = mockCookieAndGetHook({ get: spiedCookieGet });

    const isCookiesEquals = (a: any, b: any) => a.replaceAll('1', '') === b.replaceAll('1', '');
    const spiedIsCookiesEquals = jest.fn(isCookiesEquals);

    const parser = (value: any) => value?.toUpperCase();
    const spiedParser = jest.fn(parser);

    // Act
    const { result } = renderHook(() => hook({
      cookieName,
      isCookiesEquals: spiedIsCookiesEquals,
      parser: spiedParser,
    }));

    const prevCookieValueResult = result.current;

    spiedCookieGet.mockReturnValue(newCookieValue);

    // Trigger some token checks
    act(() => {
      jest.advanceTimersByTime(50_000);
    });

    // Assert
    expect(prevCookieValueResult).toEqual(prevCookieValue);
    expect(result.current).toEqual(prevCookieValue);

    expect(spiedCookieGet).toHaveBeenCalled();
    toOnlyBeCalledWith(spiedCookieGet, [cookieName]);

    expect(spiedIsCookiesEquals).toHaveBeenCalledWith(parser(prevCookieValue), parser(newCookieValue));
  });
});
