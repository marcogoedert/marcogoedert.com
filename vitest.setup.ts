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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
globalThis.cancelAnimationFrame = (_id: number): void => {
  // no-op
};

import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);
