import type { Config } from "tailwindcss";
import { tokens } from "./src/shared/tokens";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...tokens.colors,
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        input: "var(--color-input)",
        ring: "var(--color-ring)",
      },
      fonts: tokens.fonts,
      screens: tokens.breakpoints,
    },
  },
};

export default config;
