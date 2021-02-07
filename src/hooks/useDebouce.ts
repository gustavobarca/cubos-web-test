import { useState, useEffect } from 'react';

export default function useDebounce(text: string, delay: number) {
  const [value, setValue] = useState<string | undefined>(text);

  function reset() {
    setValue(undefined);
  }

  useEffect(() => {
    const handler = setTimeout(() => setValue(text), delay);

    return () => clearTimeout(handler);
  }, [text, delay]);

  return { value, reset };
}
