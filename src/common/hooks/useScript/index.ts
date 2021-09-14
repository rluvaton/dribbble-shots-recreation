import React, { useEffect, useState } from 'react';

export enum ScriptLoadingState {
  UNLOADED = 'unloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed'
}

// Based on https://stackoverflow.com/a/34425083/5923666
const useScript = (url: string, shouldLoadImmediately: boolean = false): {
  scriptLoadingState: ScriptLoadingState,
  setShouldLoad: React.Dispatch<React.SetStateAction<boolean>>,
} => {
  const [shouldLoad, setShouldLoad] = useState(shouldLoadImmediately);
  const [scriptLoadingState, setScriptLoadingState] = useState<ScriptLoadingState>(ScriptLoadingState.UNLOADED);

  useEffect(() => {
    if (!shouldLoad) {
      setScriptLoadingState(ScriptLoadingState.UNLOADED);
      return;
    }

    setScriptLoadingState(ScriptLoadingState.LOADING);

    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    script.onerror = () => setScriptLoadingState(ScriptLoadingState.FAILED);
    script.onload = () => setScriptLoadingState(ScriptLoadingState.LOADED)

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [shouldLoad, url]);

  return { scriptLoadingState, setShouldLoad };
};

export default useScript;
