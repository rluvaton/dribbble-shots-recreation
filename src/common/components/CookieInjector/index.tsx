import useSingleCookie from '../../hooks/useSingleCookie';
import useScript, { ScriptLoadingState } from '../../hooks/useScript';
import React, { useEffect, useRef } from 'react';
import * as CookiesLoader from './cookies-loader';

import './index.css';

// @ts-ignore There is no types for this library ¯\_(ツ)_/¯ (https://github.com/xavierbriole/react-cookienotice/issues/71)
import CookieNotice from 'react-cookienotice'
import usePrevious from '../../hooks/usePrevious';

const CookieInjector = () => {
  const allowCookies = useSingleCookie({
    cookieName: 'allow-cookies',
    parser: value => value === 'true',
  });
  const prevAllowCookies = usePrevious(allowCookies);

  // If when first opened the page the cookies was already allowed
  const wasCookiesAllowedOnFirstRender = useRef(prevAllowCookies === undefined && allowCookies);

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

  return (
    // Hack for making the `CookieNotice` to not taking any space (Fix #25)
    <div
      className={wasCookiesAllowedOnFirstRender.current ? 'on-start-cookies-allowed' : 'on-start-cookies-not-allowed'}>

      {/*
       We're not using the `onAcceptButtonClick` function because it's good only for the first time.
       We need to check if the `allow-cookies` exist after the user pressed accept and reloaded the page (for example)
       And the function only called when clicking accept...
       */}
      <CookieNotice/>
    </div>
  );
}

export default CookieInjector;
