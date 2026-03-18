// Make requestAnimationFrame run synchronously in tests
globalThis.requestAnimationFrame = (cb: FrameRequestCallback): number => {
  cb(0);
  return 0;
};
globalThis.cancelAnimationFrame = (_id: number): void => {};

import "@testing-library/jest-dom";
