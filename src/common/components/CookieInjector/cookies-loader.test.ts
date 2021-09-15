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

  describe('gtag', () => {
    it('window.gtag should be defined and a function', () => {
      expect(window.gtag).toBeFunction();
    })
  })

  describe('load', () => {

    function assertWindowDataLayerContent() {
      // Not using `.toEqual` on the array because the array contains the `arguments` object that some options can't be accessed
      // Opened a question on StackOverflow here - https://stackoverflow.com/q/69185702/5923666
      expect(window.dataLayer).toHaveLength(2);

      expect(window.dataLayer[0]).toHaveLength(2);
      expect(window.dataLayer[0][0]).toEqual('js');
      expect(window.dataLayer[0][1]).toEqual(expect.any(Date));

      expect(window.dataLayer[1]).toHaveLength(2);
      expect(window.dataLayer[1][0]).toEqual('config');
      expect(window.dataLayer[1][1]).toEqual(expect.stringMatching(/^G-[A-Za-z]+$/));
    }

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
      assertWindowDataLayerContent();

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
      assertWindowDataLayerContent();

      expect(spiedConsoleLog).toBeCalledTimes(1);
      expect(spiedConsoleLog).toBeCalledWith(expect.stringMatching(/^Loading/));
    });

    it.todo('test window.dataLayer contains ann `arguments` objects');
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
      expect(window.dataLayer).toEqual([]);

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
