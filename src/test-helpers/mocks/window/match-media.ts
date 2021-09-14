// Mock to solve: `TypeError: window.matchMedia is not a function`
// From https://stackoverflow.com/a/53449595/5923666

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => {
    return ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  }),
});

// Making it a module so TypeScript won't scream about:
// TS1208: 'match-media.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.
export {};
