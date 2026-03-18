import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
      background: "var(--color-bg)",
      foreground: "var(--color-text)",
      muted: "var(--color-text-muted)",
      border: "var(--color-border)",
      surface: "var(--color-surface)",
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
