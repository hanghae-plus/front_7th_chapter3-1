const BLUE = {
  50: "#F0F7FF",
  100: "#D6E4FF",
  200: "#ADC8FF",
  300: "#84A9FF",
  400: "#6690FF",
  500: "#3366FF",
  600: "#254EDB",
  700: "#1939B7",
  800: "#102693",
  900: "#091A7A",
};

const YELLOW = {
  50: "#FFF9E6",
  100: "#FFEEB3",
  200: "#FFE380",
  300: "#FFD94D",
  400: "#FFCF1A",
  500: "#E2B700",
  600: "#B29000",
  700: "#806800",
  800: "#4F4100",
  900: "#1E1A00",
};

const GREEN = {
  50: "#f0fff4",
  100: "#c6f6d5",
  200: "#9ae6b4",
  300: "#68d391",
  400: "#48bb78",
  500: "#38a169",
  600: "#25855a",
  700: "#276749",
  800: "#005246",
  900: "#1c4532",
};

const RED = {
  50: "#fff5f5",
  100: "#fed7d7",
  200: "#feb2b2",
  300: "#fc8181",
  400: "#f56565",
  500: "#e53e3e",
  600: "#c53030",
  700: "#9b2c2c",
  800: "#822727",
  900: "#63171b",
};

const GRAY = {
  50: "#FAFAFA",
  100: "#F4F4F5",
  200: "#E4E4E7",
  300: "#D4D4D8",
  400: "#A1A1AA",
  500: "#71717A",
  600: "#52525B",
  700: "#3F3F46",
  800: "#27272A",
  900: "#18181B",
};

export const colors = {
  blue: BLUE,
  yellow: YELLOW,
  green: GREEN,
  red: RED,
  gray: GRAY,

  primary: {
    DEFAULT: BLUE[500],
    foreground: "#FFFFFF",
  },

  secondary: {
    DEFAULT: GRAY[500],
    foreground: "#FFFFFF",
  },

  success: {
    DEFAULT: GREEN[500],
    foreground: "#FFFFFF",
  },

  warning: {
    DEFAULT: YELLOW[500],
    foreground: "#000000",
  },

  danger: {
    DEFAULT: RED[500],
    foreground: "#FFFFFF",
  },

  info: {
    DEFAULT: BLUE[400],
    foreground: "#FFFFFF",
  },
} as const;
