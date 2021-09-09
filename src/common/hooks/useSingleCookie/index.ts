import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'


interface UseSingleCookieOptions<T> {
  cookieName: string;
  poolTimeout?: number;
  isCookiesEquals?: (prevCookieValue: T, nextCookieValue: T) => boolean;
  parser?: (value: string | undefined) => T;
  initialValue?: T;
}

/**
 * Use Single Cookie hook
 * @param cookieName the cookie name
 * @param poolTimeout
 * @param isCookiesEquals
 * @param parser
 */
export default function useSingleCookie<T = string | undefined>({
                                                                  cookieName,
                                                                  isCookiesEquals = (prev, next) => prev === next,
                                                                  poolTimeout = 100,
                                                                  parser = (value) => value as unknown as T,
                                                                }: UseSingleCookieOptions<T>): T {
  const [cookieValue, setCookieValue] = useState<T>(
    parser(Cookies.get(cookieName)) as unknown as T,
  );

  useEffect(() => {
    const updateLocalCookieIfNeeded = () => {
      setCookieValue((prevCookieValue) => {
        const possibleNewCookieValue: T = parser(Cookies.get(cookieName));

        return isCookiesEquals(prevCookieValue, possibleNewCookieValue) ? prevCookieValue : possibleNewCookieValue;
      });
    }

    updateLocalCookieIfNeeded();

    const trackCookieValueChangeIntervalId = setInterval(() => updateLocalCookieIfNeeded(), poolTimeout);

    return () => clearInterval(trackCookieValueChangeIntervalId);
  }, [parser, cookieName, isCookiesEquals, poolTimeout]);

  return cookieValue;
}
