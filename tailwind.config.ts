import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", "[data-color-scheme='dark']"],
  theme: {
    screens: {
      xs: "450px",
      sm: "640px",
      md: "769px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      background: "rgb(var(--color-bg) / <alpha-value>)",
      foreground: "rgb(var(--color-text) / <alpha-value>)",
      muted: "rgb(var(--color-text-muted) / <alpha-value>)",
      border: "rgb(var(--color-border) / <alpha-value>)",
      surface: "rgb(var(--color-surface) / <alpha-value>)",
      transparent: "transparent",
      current: "currentColor",
    },
    extend: {
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "serif"],
        geist: ["var(--font-geist)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
