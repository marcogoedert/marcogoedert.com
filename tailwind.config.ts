import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hoc/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — resolve via CSS custom properties
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-alt": "var(--color-surface-alt)",
        foreground: "var(--color-text)",
        muted: "var(--color-text-muted)",
        border: "var(--color-border)",
        brand: "var(--color-brand)",
        "brand-muted": "var(--color-brand-muted)",
      },
      boxShadow: {
        card: "0px 35px 120px -15px rgba(0,0,0,0.3)",
      },
      screens: {
        xs: "450px",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(20deg)" },
          "75%": { transform: "rotate(-10deg)" },
        },
      },
      animation: {
        wave: "wave 0.4s ease-in-out 0.5s 3",
      },
      backgroundImage: {
        "navbar-logo-dark": "url('../assets/marco-logo-dark.svg')",
        "navbar-logo-light": "url('../assets/marco-logo-light.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
