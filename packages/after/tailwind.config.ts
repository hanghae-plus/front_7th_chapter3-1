import type { Config } from "tailwindcss";
import { tokens } from "./src/shared/tokens";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: tokens.colors,
      fonts: tokens.fonts,
      screens: tokens.breakpoints,
    },
  },
};

export default config;
