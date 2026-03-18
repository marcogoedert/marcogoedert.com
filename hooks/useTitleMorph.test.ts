import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useTitleMorph } from "./useTitleMorph";

describe("useTitleMorph", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("starts empty before the initial delay", () => {
    const { result } = renderHook(() => useTitleMorph("Marco Goedert"));
    expect(result.current).toBe("");
  });

  it("types the full title character-by-character on first load", () => {
    const { result } = renderHook(() => useTitleMorph("Marco Goedert"));

    // Nothing before initial delay
    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe("");

    // First char after 300ms
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe("M");

    // Full title after all chars typed (13 chars × 60ms = 780ms after initial char)
    act(() => vi.advanceTimersByTime(60 * 12));
    expect(result.current).toBe("Marco Goedert");
  });

  it("deletes to 'Marco' then types new title on navigation", () => {
    const { result, rerender } = renderHook(
      ({ target }: { target: string }) => useTitleMorph(target),
      { initialProps: { target: "Marco Goedert" } }
    );

    // Complete first load
    act(() => vi.runAllTimers());
    expect(result.current).toBe("Marco Goedert");

    // Navigate: "Marco Goedert" → "Marco's work and projects."
    rerender({ target: "Marco's work and projects." });

    // Deletes "Marco Goedert" (13) → "Marco" (5) = 8 deletions × 40ms
    act(() => vi.advanceTimersByTime(40 * 8));
    expect(result.current).toBe("Marco");

    // Types new suffix
    act(() => vi.runAllTimers());
    expect(result.current).toBe("Marco's work and projects.");
  });

  it("cancels in-flight animation when target changes mid-morph", () => {
    const { result, rerender } = renderHook(
      ({ target }: { target: string }) => useTitleMorph(target),
      { initialProps: { target: "Marco Goedert" } }
    );

    act(() => vi.runAllTimers());
    expect(result.current).toBe("Marco Goedert");

    rerender({ target: "Marco's work and projects." });
    act(() => vi.advanceTimersByTime(40 * 4)); // partially deleted

    // Interrupt with a new target
    rerender({ target: "Marco's recent watches." });
    act(() => vi.runAllTimers());

    expect(result.current).toBe("Marco's recent watches.");
  });

  it("shows full title immediately when disabled", () => {
    const { result } = renderHook(() =>
      useTitleMorph("Marco Goedert", { disabled: true })
    );
    expect(result.current).toBe("Marco Goedert");
  });
});
