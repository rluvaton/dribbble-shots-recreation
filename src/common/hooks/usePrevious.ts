import { useEffect, useRef } from 'react';

// From https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/
export default function usePrevious<T>(value: T): T {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current as T;
}
