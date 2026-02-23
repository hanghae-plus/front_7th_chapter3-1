import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorPalette } from "@/components/ColorPalette";

const meta = {
  title: "Design System/Colors",
  component: ColorPalette,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "디자인 시스템에서 사용하는 색상 팔레트입니다. Primitive 색상과 Semantic 색상으로 구성되어 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

// Gray Scale (primitive.css에서 최신 값 반영)
const grayScale = {
  name: "Gray",
  colors: [
    { label: "50", value: "#fafafa", variable: "--gray-50" },
    { label: "100", value: "#f5f5f5", variable: "--gray-100" },
    { label: "200", value: "#e0e0e0", variable: "--gray-200" },
    { label: "250", value: "#dddddd", variable: "--gray-250" },
    { label: "300", value: "#d1d5db", variable: "--gray-300" },
    { label: "350", value: "#cccccc", variable: "--gray-350" },
    { label: "400", value: "#bdbdbd", variable: "--gray-400" },
    { label: "500", value: "#757575", variable: "--gray-500" },
    { label: "550", value: "#666666", variable: "--gray-550" },
    { label: "600", value: "#565656", variable: "--gray-600" },
    { label: "700", value: "#424242", variable: "--gray-700" },
    { label: "800", value: "#333333", variable: "--gray-800" },
  ],
};

// Chromatic Colors (primitive.css에서 최신 값 반영)
const chromaticScales = [
  {
    name: "Blue",
    colors: [
      { label: "50", value: "#e3f2fd", variable: "--blue-50" },
      { label: "200", value: "#90caf9", variable: "--blue-200" },
      { label: "400", value: "#1976d2", variable: "--blue-400" },
      { label: "500", value: "#1565c0", variable: "--blue-500" },
      { label: "900", value: "#0d47a1", variable: "--blue-900" },
    ],
  },
  {
    name: "Cyan",
    colors: [{ label: "500", value: "#0288d1", variable: "--cyan-500" }],
  },
  {
    name: "Green",
    colors: [
      { label: "50", value: "#e8f5e9", variable: "--green-50" },
      { label: "200", value: "#81c784", variable: "--green-200" },
      { label: "500", value: "#388e3c", variable: "--green-500" },
      { label: "600", value: "#2e7d32", variable: "--green-600" },
      { label: "900", value: "#1b5e20", variable: "--green-900" },
    ],
  },
  {
    name: "Orange",
    colors: [
      { label: "50", value: "#fff3e0", variable: "--orange-50" },
      { label: "200", value: "#ffb74d", variable: "--orange-200" },
      { label: "500", value: "#f57c00", variable: "--orange-500" },
      { label: "900", value: "#e65100", variable: "--orange-900" },
    ],
  },
  {
    name: "Red",
    colors: [
      { label: "50", value: "#ffebee", variable: "--red-50" },
      { label: "200", value: "#e57373", variable: "--red-200" },
      { label: "500", value: "#d32f2f", variable: "--red-500" },
      { label: "600", value: "#c62828", variable: "--red-600" },
      { label: "900", value: "#b71c1c", variable: "--red-900" },
      { label: "alt-500", value: "#ef4444", variable: "--red-alt-500" },
    ],
  },
];

// Base Colors
const baseScale = {
  name: "Base",
  colors: [
    { label: "White", value: "#ffffff", variable: "--white" },
    { label: "Black", value: "#000000", variable: "--black" },
  ],
};

export const Gray: Story = {
  args: {
    title: "Gray",
    scales: [grayScale],
  },
};

export const Chromatic: Story = {
  args: {
    title: "Chromatic",
    scales: chromaticScales,
  },
};

export const AllPrimitive: Story = {
  args: {
    title: "Color Palette",
    scales: [grayScale, ...chromaticScales, baseScale],
  },
};

// Semantic Colors (index.css의 최신 토큰 반영)
const semanticScales = [
  {
    name: "Backgrounds",
    colors: [
      {
        label: "App Background",
        value: "#ffffff",
        variable: "--color-app-background",
      },
      {
        label: "App Background Muted",
        value: "#fafafa",
        variable: "--color-app-background-muted",
      },
      {
        label: "App Card",
        value: "#ffffff",
        variable: "--color-app-card",
      },
      {
        label: "Primary",
        value: "#1976d2",
        variable: "--color-primary",
      },
      {
        label: "Secondary",
        value: "#f5f5f5",
        variable: "--color-secondary",
      },
      {
        label: "Danger",
        value: "#d32f2f",
        variable: "--color-danger",
      },
      {
        label: "Success",
        value: "#388e3c",
        variable: "--color-success",
      },
      {
        label: "Warning",
        value: "#f57c00",
        variable: "--color-warning",
      },
      {
        label: "Info",
        value: "#0288d1",
        variable: "--color-info",
      },
      {
        label: "Muted",
        value: "#757575",
        variable: "--color-muted",
      },
    ],
  },
  {
    name: "Alert Backgrounds",
    colors: [
      {
        label: "Alert Danger",
        value: "#ffebee",
        variable: "--color-alert-danger",
      },
      {
        label: "Alert Info",
        value: "#e3f2fd",
        variable: "--color-alert-info",
      },
      {
        label: "Alert Success",
        value: "#e8f5e9",
        variable: "--color-alert-success",
      },
      {
        label: "Alert Warning",
        value: "#fff3e0",
        variable: "--color-alert-warning",
      },
      {
        label: "Alert Muted",
        value: "#f5f5f5",
        variable: "--color-alert-muted",
      },
    ],
  },
  {
    name: "Text",
    colors: [
      {
        label: "App Foreground",
        value: "#333333",
        variable: "--color-app-foreground",
      },
      {
        label: "App Text Secondary",
        value: "#424242",
        variable: "--color-app-text-secondary",
      },
      {
        label: "App Text Tertiary",
        value: "#666666",
        variable: "--color-app-text-tertiary",
      },
      {
        label: "App Muted Foreground",
        value: "#424242",
        variable: "--color-app-muted-foreground",
      },
      {
        label: "Text Disabled",
        value: "#757575",
        variable: "--color-text-disabled",
      },
    ],
  },
  {
    name: "Borders",
    colors: [
      {
        label: "Border",
        value: "#bdbdbd",
        variable: "--color-border",
      },
      {
        label: "Border Light",
        value: "#dddddd",
        variable: "--color-border-light",
      },
      {
        label: "Border Primary",
        value: "#1565c0",
        variable: "--color-border-primary",
      },
      {
        label: "Border Danger",
        value: "#c62828",
        variable: "--color-border-danger",
      },
      {
        label: "Border Success",
        value: "#2e7d32",
        variable: "--color-border-success",
      },
      {
        label: "Alert Danger Border",
        value: "#e57373",
        variable: "--color-alert-danger-border",
      },
      {
        label: "Alert Success Border",
        value: "#81c784",
        variable: "--color-alert-success-border",
      },
      {
        label: "Alert Info Border",
        value: "#90caf9",
        variable: "--color-alert-info-border",
      },
      {
        label: "Alert Warning Border",
        value: "#ffb74d",
        variable: "--color-alert-warning-border",
      },
      {
        label: "Alert Muted Border",
        value: "#bdbdbd",
        variable: "--color-alert-muted-border",
      },
    ],
  },
];

export const Semantic: Story = {
  args: {
    title: "Color Roles",
    scales: semanticScales,
  },
};
