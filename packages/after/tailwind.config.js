import { tokens } from './src/styles/tokens'
import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}", // Storybook 파일도 포함
  ],
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        secondary: tokens.colors.secondary,
        success: tokens.colors.success,
        danger: tokens.colors.danger,
        warning: tokens.colors.warning,
        info: tokens.colors.info,
        neutral: tokens.colors.neutral,
        text: tokens.colors.text,
        border: tokens.colors.border,
        background: tokens.colors.background,
        white: tokens.colors.white,
        black: tokens.colors.black,
      },
      spacing: {
        ...tokens.spacing,
        // Button specific spacing for exact matching
        'btn-sm-y': '6px',
        'btn-md-y': '10px',
        'btn-lg-y': '12px',
      },
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      lineHeight: {
        ...tokens.typography.lineHeight,
        'btn': '1.5',
      },
      borderRadius: {
        ...tokens.borderRadius,
        'btn': '3px',
      },
      boxShadow: tokens.shadows,
      width: tokens.width,
      height: tokens.height,
    },
  },
  safelist: [
    // Button classes - pattern matching for all button classes
    {
      pattern: /^(px-|py-|text-\[|leading-\[|rounded-\[|bg-\[|border-\[|hover:enabled:bg-\[).*/,
    },
    // Explicit classes
    'inline-block',
    'font-sans',
    'font-normal',
    'cursor-pointer',
    'border',
    'border-solid',
    'whitespace-nowrap',
    'disabled:opacity-60',
    'disabled:cursor-not-allowed',
    'text-white',
    'w-full',
  ],
  plugins: [tailwindcssAnimate],
}

