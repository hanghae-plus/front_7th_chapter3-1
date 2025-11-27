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

// 다크모드 색상 정의
const BLUE_DARK = {
  50: "#091A7A",
  100: "#102693",
  200: "#1939B7",
  300: "#254EDB",
  400: "#3366FF",
  500: "#6690FF",
  600: "#84A9FF",
  700: "#ADC8FF",
  800: "#D6E4FF",
  900: "#F0F7FF",
};

const YELLOW_DARK = {
  50: "#1E1A00",
  100: "#4F4100",
  200: "#806800",
  300: "#B29000",
  400: "#E2B700",
  500: "#FFCF1A",
  600: "#FFD94D",
  700: "#FFE380",
  800: "#FFEEB3",
  900: "#FFF9E6",
};

const GREEN_DARK = {
  50: "#1C4532",
  100: "#005246",
  200: "#276749",
  300: "#25855A",
  400: "#38A169",
  500: "#48BB78",
  600: "#68D391",
  700: "#9AE6B4",
  800: "#C6F6D5",
  900: "#F0FFF4",
};

const RED_DARK = {
  50: "#63171B",
  100: "#822727",
  200: "#9B2C2C",
  300: "#C53030",
  400: "#E53E3E",
  500: "#F56565",
  600: "#FC8181",
  700: "#FEB2B2",
  800: "#FED7D7",
  900: "#FFF5F5",
};

const GRAY_DARK = {
  50: "#18181B",
  100: "#27272A",
  200: "#3F3F46",
  300: "#52525B",
  400: "#71717A",
  500: "#A1A1AA",
  600: "#D4D4D8",
  700: "#E4E4E7",
  800: "#F4F4F5",
  900: "#FAFAFA",
};

export const colors = {
  blue: BLUE,
  yellow: YELLOW,
  green: GREEN,
  red: RED,
  gray: GRAY,

  // 다크모드 색상
  dark: {
    blue: BLUE_DARK,
    yellow: YELLOW_DARK,
    green: GREEN_DARK,
    red: RED_DARK,
    gray: GRAY_DARK,
  },

  primary: {
    DEFAULT: BLUE[500],
    foreground: "#FFFFFF",
    dark: {
      DEFAULT: BLUE_DARK[500],
      foreground: "#FFFFFF",
    },
  },

  secondary: {
    DEFAULT: GRAY[500],
    foreground: "#FFFFFF",
    dark: {
      DEFAULT: GRAY_DARK[300],
      foreground: "#FFFFFF",
    },
  },

  success: {
    DEFAULT: GREEN[500],
    foreground: "#FFFFFF",
    dark: {
      DEFAULT: GREEN_DARK[500],
      foreground: "#FFFFFF",
    },
  },

  warning: {
    DEFAULT: YELLOW[500],
    foreground: "#000000",
    dark: {
      DEFAULT: YELLOW_DARK[500],
      foreground: "#000000",
    },
  },

  danger: {
    DEFAULT: RED[500],
    foreground: "#FFFFFF",
    dark: {
      DEFAULT: RED_DARK[500],
      foreground: "#FFFFFF",
    },
  },

  info: {
    DEFAULT: BLUE[400],
    foreground: "#FFFFFF",
    dark: {
      DEFAULT: BLUE_DARK[600],
      foreground: "#FFFFFF",
    },
  },

  // 배경 및 전경 색상
  background: {
    light: "#FFFFFF",
    dark: "#18181B",
  },

  foreground: {
    light: "#18181B",
    dark: "#FAFAFA",
  },

  card: {
    light: "#FFFFFF",
    dark: "#27272A",
  },

  cardForeground: {
    light: "#18181B",
    dark: "#FAFAFA",
  },

  muted: {
    light: "#F4F4F5",
    dark: "#3F3F46",
  },

  mutedForeground: {
    light: "#71717A",
    dark: "#A1A1AA",
  },

  accent: {
    light: "#F4F4F5",
    dark: "#3F3F46",
  },

  accentForeground: {
    light: "#18181B",
    dark: "#FAFAFA",
  },

  input: {
    light: "#E4E4E7",
    dark: "#3F3F46",
  },

  ring: {
    light: BLUE[500],
    dark: BLUE_DARK[500],
  },
} as const;
