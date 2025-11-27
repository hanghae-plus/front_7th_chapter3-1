/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx,tsx}',
    './components/**/*.{js,jsx,tsx}',
    './app/**/*.{js,jsx,tsx}',
    './src/**/*.{js,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        base: ['var(--font-family-base)', 'Arial', 'sans-serif'],
        alt: ['var(--font-family-alt)', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        // Base colors
        white: '#ffffff',
        black: '#000000',

        // Primary palette (직접 색상 지정)
        primary: {
          DEFAULT: '#1976d2',
          dark: '#1565c0',
          foreground: '#ffffff',
        },

        // Semantic colors
        success: {
          DEFAULT: 'var(--color-success)',
          dark: 'var(--color-success-dark)',
          foreground: 'var(--color-success-foreground)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          dark: 'var(--color-danger-dark)',
          foreground: 'var(--color-danger-foreground)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          foreground: 'var(--color-warning-foreground)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          foreground: 'var(--color-info-foreground)',
        },

        // Neutral palette
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          250: 'var(--color-neutral-250)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },

        // Background and foreground
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',

        // Card
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },

        // Border
        border: 'var(--color-border)',
        'border-muted': 'var(--color-border-muted)',

        // Input
        input: 'var(--color-input)',

        // Muted
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },

        // Accent
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },

        // Alert palette
        alert: {
          info: {
            bg: 'var(--color-alert-info-bg)',
            border: 'var(--color-alert-info-border)',
            text: 'var(--color-alert-info-text)',
          },
          success: {
            bg: 'var(--color-alert-success-bg)',
            border: 'var(--color-alert-success-border)',
            text: 'var(--color-alert-success-text)',
          },
          warning: {
            bg: 'var(--color-alert-warning-bg)',
            border: 'var(--color-alert-warning-border)',
            text: 'var(--color-alert-warning-text)',
          },
          error: {
            bg: 'var(--color-alert-error-bg)',
            border: 'var(--color-alert-error-border)',
            text: 'var(--color-alert-error-text)',
          },
        },

        // Alpha blacks (for compatibility)
        'black-04': 'rgba(0, 0, 0, 0.04)',
        'black-08': 'rgba(0, 0, 0, 0.08)',
        'black-12': 'rgba(0, 0, 0, 0.12)',
        'black-14': 'rgba(0, 0, 0, 0.14)',
        'black-20': 'rgba(0, 0, 0, 0.2)',
        'black-23': 'rgba(0, 0, 0, 0.23)',
        'black-50': 'rgba(0, 0, 0, 0.5)',
        'black-54': 'rgba(0, 0, 0, 0.54)',
        'black-60': 'rgba(0, 0, 0, 0.6)',
        'black-87': 'rgba(0, 0, 0, 0.87)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        DEFAULT: 'var(--radius)',
        '3': 'var(--radius-3)',
      },
      fontSize: {
        '13': 'var(--font-size-13)',
        '14': 'var(--font-size-14)',
        '15': 'var(--font-size-15)',
      },
      spacing: {
        'token-2': 'var(--spacing-2)',
        'token-4': 'var(--spacing-4)',
        'token-5': 'var(--spacing-5)',
        'token-8': 'var(--spacing-8)',
        'token-9': 'var(--spacing-9)',
      },
      lineHeight: {
        normal: 'var(--line-height-normal)',
      },
      boxShadow: {
        // Card shadows
        'card-default': '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
        'card-elevated': '0px 2px 4px -1px rgba(0, 0, 0, 0.12), 0px 1px 2px 0px rgba(0, 0, 0, 0.08), 0px 1px 4px 0px rgba(0, 0, 0, 0.08)',
        // Modal shadow
        'modal': '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 1.4s linear infinite',
      },
    },
  },
  plugins: [],
}