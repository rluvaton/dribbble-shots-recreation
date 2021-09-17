import useSingleCookie from '../../hooks/useSingleCookie';
import useScript, { ScriptLoadingState } from '../../hooks/useScript';
import React, { useEffect } from 'react';
import * as CookiesLoader from './cookies-loader';

// @ts-ignore There is no types for this library ¯\_(ツ)_/¯ (https://github.com/xavierbriole/react-cookienotice/issues/71)
import CookieNotice from 'react-cookienotice'

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

  // until https://github.com/xavierbriole/react-cookienotice/pull/73 get merged we do this hack
  // so it won't block the UI
  //
  // We're not using the `onAcceptButtonClick` function because it's good only for the first time.
  // We need to check if the `allow-cookies` exist after the user pressed accept and reloaded the page (for example)
  // And the function only called when clicking accept...
  return allowCookies ? null : <CookieNotice/>;
}

export default CookieInjector;
