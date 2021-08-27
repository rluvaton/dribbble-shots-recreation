import { useCallback, useState } from 'react'

export interface UseAnimateProps<T> {
  animate: (value: { node: T, on: boolean }) => Promise<void>;
  node: T;
  disabled?: boolean;
}

/**
 * A hook to provide animation status.
 * @param animate function that returns a Promise to perform animation
 * @param node DOM node or anything else
 * @param disabled Disable animation
 *
 * @example
 * const { on, onToggle } = useAnimate({
 *    animate: async () => { },
 *    node: node
 * })
 */
export default function useAnimate<T>({ animate, node, disabled }: UseAnimateProps<T>)
  : [on: boolean, onToggle: (isOn: boolean) => void] {
  const [on, setOn] = useState(false)

  const onToggle = useCallback(v => {
    if (disabled) {
      return;
    }

    if (v) {
      setOn(true);
    }

    animate({ node, on: v })
      .finally(() => {
        if (!v) {
          setOn(false);
        }
      })
  }, [animate, node, disabled])

  return [on, onToggle]
}

