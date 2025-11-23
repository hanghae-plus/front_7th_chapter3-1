// typography 디자인 토큰

export const typography = {
  fontFamily: {
    default: "Arial, sans-serif",
    roboto: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  fontSize: {
    12: "0.75rem", // 12px
    14: "0.875rem", // 14px
    16: "1rem", // 16px
    18: "1.125rem", // 18px
    20: "1.25rem", // 20px
    24: "1.5rem", // 24px
    30: "1.875rem", // 30px
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    bold: "700",
  },
  lineHeight: {
    none: "1",
    tight: "1.4",
    normal: "1.5",
    relaxed: "1.6",
  },
} as const;

// color 디자인 토큰 (Primitive)
export const colors = {
  red: {
    50: "#ffebee",
    100: "#ffcdd2",
    300: "#e57373",
    500: "#d32f2f",
    600: "#c62828",
    700: "#b71c1c",
  },
  blue: {
    50: "#e3f2fd",
    100: "#bbdefb",
    300: "#90caf9",
    500: "#1976d2",
    600: "#1565c0",
    700: "#0288d1",
    900: "#0d47a1",
  },
  green: {
    50: "#e8f5e9",
    100: "#c8e6c9",
    300: "#81c784",
    500: "#388e3c",
    600: "#2e7d32",
    900: "#1b5e20",
  },
  yellow: {
    50: "#fff3e0",
    100: "#ffe0b2",
    300: "#ffb74d",
    500: "#f57c00",
    700: "#e65100",
  },
  gray: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e0e0e0",
    300: "#d1d5db",
    350: "#dddddd",
    400: "#bdbdbd",
    450: "#cccccc",
    500: "#757575",
    600: "#6b7280",
    650: "#666666",
    700: "#424242",
    800: "#374151",
    900: "#333333",
  },
  white: "#ffffff",
  black: "#000000",
};

export const spacing = {
  0: "0",
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  14: "14px",
  16: "16px",
  20: "20px",
  24: "24px",
} as const;

export const borderRadius = {
  none: "0",
  sm: "2px",
  md: "3px",
  lg: "4px",
  xl: "10px",
  full: "50%",
} as const;
