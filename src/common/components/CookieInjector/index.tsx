import useSingleCookie from '../../hooks/useSingleCookie';
import useScript, { ScriptLoadedState } from '../../hooks/useScript';
import React, { useEffect } from 'react';

// @ts-ignore There is no types for this library ¯\_(ツ)_/¯
import CookieNotice from 'react-cookienotice'

const googleAnalyticsScriptUrl = 'https://www.googletagmanager.com/gtag/js?id=G-QJKNRLFEXM';

const CookieInjector = () => {
  const allowCookies = useSingleCookie<boolean>({
    cookieName: 'allow-cookies',
    parser: value => value === 'true',
  });

  const {
    scriptLoadedState: googleAnalyticsScriptLoadedState,
    setShouldLoad: setShouldLoadCookies,
  } = useScript(googleAnalyticsScriptUrl)

  useEffect(() => {
    if (!allowCookies) {
      setShouldLoadCookies(false);
      return;
    }

    switch (googleAnalyticsScriptLoadedState) {
      case ScriptLoadedState.LOADED:
        // Continue loading the script
        break;

      case ScriptLoadedState.UNLOADED:
        setShouldLoadCookies(true);
        return;

      case ScriptLoadedState.LOADING:
      case ScriptLoadedState.FAILED:
      default:
        return;
    }


    // Global site tag (gtag.js) - Google Analytics
    // Sorry 😬 but I need to know how my website is doing

    // @ts-ignore
    window.dataLayer = window.dataLayer || [];

    function gtag(...args: any[]) {
      // @ts-ignore
      window.dataLayer.push(args);
    }

    gtag('js', new Date());
    gtag('config', 'G-QJKNRLFEXM');
  }, [setShouldLoadCookies, allowCookies, googleAnalyticsScriptLoadedState]);

  // Add the notice everywhere
  return <CookieNotice/>
}

export default CookieInjector;
