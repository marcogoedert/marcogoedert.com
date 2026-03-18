// Mock requestAnimationFrame to prevent infinite loops with framer-motion
let rafId = 0;
const rafCallbacks = new Set<FrameRequestCallback>();

globalThis.requestAnimationFrame = (cb: FrameRequestCallback): number => {
  const id = ++rafId;
  rafCallbacks.add(cb);
  Promise.resolve().then(() => {
    rafCallbacks.delete(cb);
    cb(0);
  });
  return id;
};

globalThis.cancelAnimationFrame = (id: number): void => {
  // no-op
};

import "@testing-library/jest-dom";
