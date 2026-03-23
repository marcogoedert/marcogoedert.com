import { useRef, useCallback } from "react";

export function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  const update = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", (((e.clientX - rect.left) / rect.width) * 100).toFixed(0) + "%");
    el.style.setProperty("--mouse-y", (((e.clientY - rect.top) / rect.height) * 100).toFixed(0) + "%");
  }, []);

  return { ref, onMouseEnter: update, onMouseMove: update };
}
