// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

beforeEach(() => {
  vi.stubGlobal("requestAnimationFrame", vi.fn());
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    createRadialGradient: vi.fn().mockReturnValue({ addColorStop: vi.fn() }),
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 0,
  });
});

import { ParticleCanvas } from "./ParticleCanvas";

describe("ParticleCanvas", () => {
  it("renders a canvas element", () => {
    const { container } = render(<ParticleCanvas />);
    expect(container.querySelector("canvas")).not.toBeNull();
  });

  it("canvas is fixed and full-screen", () => {
    const { container } = render(<ParticleCanvas />);
    const canvas = container.querySelector("canvas") as HTMLCanvasElement;
    expect(canvas.className).toMatch(/fixed/);
    expect(canvas.className).toMatch(/inset-0/);
  });

  it("canvas sits below other content (z-0)", () => {
    const { container } = render(<ParticleCanvas />);
    const canvas = container.querySelector("canvas") as HTMLCanvasElement;
    expect(canvas.className).toMatch(/z-0/);
  });
});
