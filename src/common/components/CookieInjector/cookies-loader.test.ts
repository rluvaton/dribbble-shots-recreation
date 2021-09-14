import type * as CookiesLoaderType from './cookies-loader';

function getCookiesLoader(): typeof CookiesLoaderType {
  let CookiesLoader: typeof CookiesLoaderType;

  // Must use isolateModules because we need to require a new module everytime
  jest.isolateModules(() => {
    CookiesLoader = require('./cookies-loader');
  });

  // @ts-ignore assert the CookiesLoader (TS screams about using variable before initialisation)
  expect(CookiesLoader).toBeDefined();

  // @ts-ignore the CookiesLoader must be defined as we assert it
  return CookiesLoader;
}

describe('Cookies Loader', () => {
  let CookiesLoader: typeof CookiesLoaderType;

  beforeEach(()=> {
    // @ts-ignore We want a clean state when loading the cookie
    delete window.dataLayer;

    CookiesLoader = getCookiesLoader();
  });

  describe('load', () => {

    it('should be defined', () => {
      // Arrange
      const { load } = CookiesLoader;

      // Assert
      expect(load).toBeDefined();
      expect(typeof load).toEqual('function');
    });

    it(`should add ['js', date] and ['config', key] to window.dataLayer and log Loading`, () => {
      // Arrange
      const { load } = CookiesLoader;
      const spiedConsoleLog = jest.spyOn(console, 'log').mockImplementation();

      // Act
      load();

      // Assert
      expect(window.dataLayer).toEqual([
        ['js', expect.any(Date)],
        ['config', expect.stringMatching(/^G-[A-Za-z]+$/)],
      ]);

      expect(spiedConsoleLog).toBeCalledTimes(1);
      expect(spiedConsoleLog).toBeCalledWith(expect.stringMatching(/^Loading/));

    });

    it(`should add ['js', date] and ['config', key] to window.dataLayer and log Loading only once when calling load twice`, () => {
      // Arrange
      const { load } = CookiesLoader;
      const spiedConsoleLog = jest.spyOn(console, 'log').mockImplementation();

      // Act
      // Should load
      load();

      // Should not load already loaded providers
      load();

      // Assert
      expect(window.dataLayer).toEqual([
        ['js', expect.any(Date)],
        ['config', expect.stringMatching(/^G-[A-Za-z]+$/)],
      ]);

      expect(spiedConsoleLog).toBeCalledTimes(1);
      expect(spiedConsoleLog).toBeCalledWith(expect.stringMatching(/^Loading/));
    });

  });

  describe('unload', () => {

    it('should be defined', () => {
      // Arrange
      const { unload } = CookiesLoader;

      // Assert
      expect(unload).toBeDefined();
      expect(typeof unload).toEqual('function');
    });

    it(`shouldn't log Unloading when no provider has been loaded`, () => {
      // Arrange
      const { unload } = CookiesLoader;
      const spiedConsoleLog = jest.spyOn(console, 'log').mockImplementation();
      jest.spyOn(console, 'error').mockImplementation();

      // Act
      unload();

      // Assert
      expect(window.dataLayer).toEqual(undefined);

      expect(spiedConsoleLog).toBeCalledTimes(0);
    });

    it(`should set the window.dataLayer to be empty array and log Unloading when load has already been loaded`, () => {
      // Arrange
      const { unload, load } = CookiesLoader;
      const spiedConsoleLog = jest.spyOn(console, 'log').mockImplementation();

      // Act
      load();
      unload();

      // Assert
      expect(window.dataLayer).toEqual([]);

      expect(spiedConsoleLog).toBeCalledTimes(2);
      expect(spiedConsoleLog).toHaveBeenNthCalledWith(2, expect.stringMatching(/^Unloading/));

    });
  });

  describe('scriptUrl', () => {
    it('should be defined', () => {
      // Arrange
      const { scriptUrl } = CookiesLoader;

      // Assert
      expect(scriptUrl).toBeDefined();
      expect(typeof scriptUrl).toEqual('string');
    });
  });
});
