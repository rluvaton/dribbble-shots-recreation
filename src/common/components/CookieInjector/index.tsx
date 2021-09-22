import useSingleCookie from '../../hooks/useSingleCookie';
import useScript, { ScriptLoadingState } from '../../hooks/useScript';
import React, { useEffect } from 'react';
import * as CookiesLoader from './cookies-loader';

import CookieNotice from 'react-cookienotice';
import 'react-cookienotice/dist/index.css';

const CookieInjector = () => {
  const allowCookies = useSingleCookie({
    cookieName: 'allow-cookies',
    parser: value => value === 'true',
  });

  const {
    scriptLoadingState: googleAnalyticsScriptLoadedState,
    setShouldLoad: setShouldLoadCookies,
  } = useScript(CookiesLoader.scriptUrl);

  useEffect(() => {
    if (!allowCookies) {
      setShouldLoadCookies(false);
      CookiesLoader.unload();
      return;
    }

    switch (googleAnalyticsScriptLoadedState) {
      case ScriptLoadingState.LOADED:
        // Continue loading the script
        break;

      case ScriptLoadingState.UNLOADED:
        setShouldLoadCookies(true);
        return;

      case ScriptLoadingState.LOADING:
      case ScriptLoadingState.FAILED:
      default:
        return;
    }

    CookiesLoader.load();
  }, [setShouldLoadCookies, allowCookies, googleAnalyticsScriptLoadedState]);

  // We're not using the `onAcceptButtonClick` function because it's good only for the first time.
  // We need to check if the `allow-cookies` exist after the user pressed accept and reloaded the page (for example)
  // And the function only called when clicking accept...
  return <CookieNotice/>;
}

export default CookieInjector;
