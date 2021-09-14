declare global {
  interface Window {
    // Google Tags Manager
    dataLayer: any[];
  }
}


const GOOGLE_TAGS_ID = 'G-QJKNRLFEXM';
const GOOGLE_ANALYTICS_SCRIPT_URL = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAGS_ID}`;

// Google Tag Manager (Google Analytics) required function
function gtag(...args: any[]) {
  window.dataLayer.push(args);
}


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
      window.dataLayer = window.dataLayer || [];

      gtag('js', new Date());
      gtag('config', 'G-QJKNRLFEXM');
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
