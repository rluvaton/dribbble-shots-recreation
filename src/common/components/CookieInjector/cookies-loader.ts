declare global {
  interface Window {
    // Google Tags Manager
    dataLayer: any[];

    gtag: (...args: any) => void;
  }
}


const GOOGLE_TAGS_ID = 'G-QJKNRLFEXM';
const GOOGLE_ANALYTICS_SCRIPT_URL = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAGS_ID}`;

// ----------- START: Google Tag Manager (Google Analytics) required code -----------

// The function is usually done in the script tag within the global scope, so we adding the function to the global scope
window.gtag = function gtag() {
  // Use `arguments` instead of the rest parameter
  // See why here - https://stackoverflow.com/a/69185535/5923666
  // TL;DR: arguments contain some data that not passed in the rest parameters
  window.dataLayer.push(arguments);
}

window.dataLayer = window.dataLayer || [];

// ----------- END: Google Tag Manager (Google Analytics) required code -----------

// In case of adding more providers we need to modify the `CookieInjector` to load the other scripts too
const cookies: {
  [provider: string]: {
    loaded: boolean,
    load: () => void,
    unload: () => void,
  }
} = {
  /**
   * Global site tag (gtag.js) - Google Analytics
   * Sorry 😬 but I need to know how my website is doing
   */
  googleTagManager: {
    loaded: false,
    load: () => {
      window.gtag('js', new Date());
      window.gtag('config', GOOGLE_TAGS_ID);
    },
    unload: () => {
      // This is the best thing I can think of for removing traces of Google Tags Manager
      // (The HTML `script` block is already been removed
      if (window.dataLayer) {
        window.dataLayer = [];
      }
    },
  },
}


export function load() {
  for (const [provider, providerFns] of Object.entries(cookies)) {
    if (providerFns.loaded) {
      continue;
    }

    console.log(`Loading ${provider}`);

    providerFns.load();
    providerFns.loaded = true;
  }
}

/**
 * Unload cookies
 */
export function unload() {
  for (const [provider, providerFns] of Object.entries(cookies)) {
    if (!providerFns.loaded) {
      continue;
    }

    console.log(`Unloading ${provider}`);

    providerFns.unload();
    providerFns.loaded = false;
  }
}

// In case of adding more providers we need to modify the `CookieInjector` to load the other scripts too
export const scriptUrl = GOOGLE_ANALYTICS_SCRIPT_URL;
