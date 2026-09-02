import { useEffect, useState } from "react";

function readWindowSize() {
  return { width: window.innerWidth, height: window.innerHeight };
}

export function useWindowSize() {
  const [size, setSize] = useState(readWindowSize);

  useEffect(() => {
    const updateSize = () => setSize(readWindowSize());

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
