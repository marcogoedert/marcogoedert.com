"use client";

import { useCallback, useEffect, useState } from "react";

export type ColorScheme = "light" | "dark";

const COOKIE_NAME = "color-scheme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function readCookie(): ColorScheme | null {
  const match = document.cookie.match(/(?:^|;\s*)color-scheme=([^;]+)/);
  const value = match?.[1];
  return value === "light" || value === "dark" ? value : null;
}

function getSystemPreference(): ColorScheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyScheme(scheme: ColorScheme) {
  document.documentElement.setAttribute("data-color-scheme", scheme);
  document.cookie = `${COOKIE_NAME}=${scheme}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function useColorScheme() {
  // Always start with "light" to match server render, then sync in useEffect
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  useEffect(() => {
    const actual = readCookie() ?? getSystemPreference();
    setColorScheme(actual);
    applyScheme(actual);
  }, []);

  const toggleColorScheme = useCallback(() => {
    setColorScheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      applyScheme(next);
      return next;
    });
  }, []);

  return { colorScheme, toggleColorScheme };
}
