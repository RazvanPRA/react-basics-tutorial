import { useCallback, useState } from "react";

// Un custom hook are o singură regulă specială: numele începe cu `use`.
// În rest, este o funcție normală care poate apela alte hooks.
export function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);

  const increment = useCallback(() => setCount(current => current + step), [step]);
  const decrement = useCallback(() => setCount(current => Math.max(0, current - step)), [step]);
  const reset = useCallback(() => setCount(initial), [initial]);

  return { count, increment, decrement, reset };
}
