import React, { useEffect, useState } from 'react';

export enum ScriptLoadedState {
  UNLOADED = 'unloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed'
}

// Based on https://stackoverflow.com/a/34425083/5923666
const useScript = (url: string, shouldLoadImmediately: boolean = false): {
  scriptLoadedState: ScriptLoadedState,
  setShouldLoad: React.Dispatch<React.SetStateAction<boolean>>,
} => {
  const [shouldLoad, setShouldLoad] = useState(shouldLoadImmediately);
  const [scriptLoadedState, setScriptLoadedState] = useState<ScriptLoadedState>(ScriptLoadedState.UNLOADED);

  useEffect(() => {
    if (!shouldLoad) {
      setScriptLoadedState(ScriptLoadedState.UNLOADED);
      return;
    }

    setScriptLoadedState(ScriptLoadedState.LOADING);

    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    script.onerror = () => setScriptLoadedState(ScriptLoadedState.FAILED);
    script.onload = () => setScriptLoadedState(ScriptLoadedState.LOADED)

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [shouldLoad, url]);

  return { scriptLoadedState, setShouldLoad };
};

export default useScript;
