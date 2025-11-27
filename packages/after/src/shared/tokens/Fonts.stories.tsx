import type { Meta, StoryObj } from "@storybook/react";
import { fonts } from "./fonts";

const meta = {
  title: "Design Tokens/Fonts",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const FontFamilyDemo = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Font Families</h2>
      <div className="space-y-4">
        <div>
          <div className="text-sm font-semibold text-muted-foreground mb-2">
            Sans Serif
          </div>
          <div
            style={{ fontFamily: fonts.fontFamily.sans }}
            className="text-lg border-b pb-2"
          >
            {fonts.fontFamily.sans}
          </div>
          <div
            style={{ fontFamily: fonts.fontFamily.sans }}
            className="mt-2 text-base"
          >
            The quick brown fox jumps over the lazy dog. 1234567890
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-muted-foreground mb-2">
            Serif
          </div>
          <div
            style={{ fontFamily: fonts.fontFamily.serif }}
            className="text-lg border-b pb-2"
          >
            {fonts.fontFamily.serif}
          </div>
          <div
            style={{ fontFamily: fonts.fontFamily.serif }}
            className="mt-2 text-base"
          >
            The quick brown fox jumps over the lazy dog. 1234567890
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-muted-foreground mb-2">
            Monospace
          </div>
          <div
            style={{ fontFamily: fonts.fontFamily.mono }}
            className="text-lg border-b pb-2"
          >
            {fonts.fontFamily.mono}
          </div>
          <div
            style={{ fontFamily: fonts.fontFamily.mono }}
            className="mt-2 text-base"
          >
            The quick brown fox jumps over the lazy dog. 1234567890
          </div>
        </div>
      </div>
    </div>
  );
};

const FontSizeDemo = () => {
  const sizes = Object.entries(fonts.fontSize) as [
    keyof typeof fonts.fontSize,
    string
  ][];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Font Sizes</h2>
      <div className="space-y-4">
        {sizes.map(([name, size]) => (
          <div key={name} className="border-b pb-4">
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-sm font-semibold text-muted-foreground">
                {name.toUpperCase()}
              </div>
              <div className="text-xs text-muted-foreground">{size}</div>
            </div>
            <div style={{ fontSize: size }} className="font-medium">
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FontWeightDemo = () => {
  const weights = Object.entries(fonts.fontWeight) as [
    keyof typeof fonts.fontWeight,
    number
  ][];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Font Weights</h2>
      <div className="space-y-4">
        {weights.map(([name, weight]) => (
          <div key={name} className="border-b pb-4">
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-sm font-semibold text-muted-foreground">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </div>
              <div className="text-xs text-muted-foreground">{weight}</div>
            </div>
            <div style={{ fontWeight: weight }} className="text-lg">
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LineHeightDemo = () => {
  const lineHeights = Object.entries(fonts.lineHeight) as [
    keyof typeof fonts.lineHeight,
    number
  ][];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Line Heights</h2>
      <div className="space-y-4">
        {lineHeights.map(([name, lineHeight]) => (
          <div key={name} className="border-b pb-4">
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-sm font-semibold text-muted-foreground">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </div>
              <div className="text-xs text-muted-foreground">{lineHeight}</div>
            </div>
            <div
              style={{ lineHeight: lineHeight }}
              className="text-base max-w-md"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TypographyScale = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Typography Scale</h2>
      <div className="space-y-6">
        <div>
          <div
            style={{
              fontSize: fonts.fontSize["4xl"],
              fontWeight: fonts.fontWeight.bold,
              lineHeight: fonts.lineHeight.tight,
            }}
            className="mb-2"
          >
            Heading 1
          </div>
          <div className="text-xs text-muted-foreground">
            {fonts.fontSize["4xl"]} / {fonts.fontWeight.bold} /{" "}
            {fonts.lineHeight.tight}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: fonts.fontSize["3xl"],
              fontWeight: fonts.fontWeight.bold,
              lineHeight: fonts.lineHeight.tight,
            }}
            className="mb-2"
          >
            Heading 2
          </div>
          <div className="text-xs text-muted-foreground">
            {fonts.fontSize["3xl"]} / {fonts.fontWeight.bold} /{" "}
            {fonts.lineHeight.tight}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: fonts.fontSize["2xl"],
              fontWeight: fonts.fontWeight.semibold,
              lineHeight: fonts.lineHeight.normal,
            }}
            className="mb-2"
          >
            Heading 3
          </div>
          <div className="text-xs text-muted-foreground">
            {fonts.fontSize["2xl"]} / {fonts.fontWeight.semibold} /{" "}
            {fonts.lineHeight.normal}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: fonts.fontSize.xl,
              fontWeight: fonts.fontWeight.semibold,
              lineHeight: fonts.lineHeight.normal,
            }}
            className="mb-2"
          >
            Heading 4
          </div>
          <div className="text-xs text-muted-foreground">
            {fonts.fontSize.xl} / {fonts.fontWeight.semibold} /{" "}
            {fonts.lineHeight.normal}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: fonts.fontSize.lg,
              fontWeight: fonts.fontWeight.medium,
              lineHeight: fonts.lineHeight.normal,
            }}
            className="mb-2"
          >
            Heading 5
          </div>
          <div className="text-xs text-muted-foreground">
            {fonts.fontSize.lg} / {fonts.fontWeight.medium} /{" "}
            {fonts.lineHeight.normal}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: fonts.fontSize.base,
              fontWeight: fonts.fontWeight.regular,
              lineHeight: fonts.lineHeight.normal,
            }}
            className="mb-2"
          >
            Body Text
          </div>
          <div className="text-xs text-muted-foreground">
            {fonts.fontSize.base} / {fonts.fontWeight.regular} /{" "}
            {fonts.lineHeight.normal}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: fonts.fontSize.sm,
              fontWeight: fonts.fontWeight.regular,
              lineHeight: fonts.lineHeight.relaxed,
            }}
            className="mb-2"
          >
            Small Text
          </div>
          <div className="text-xs text-muted-foreground">
            {fonts.fontSize.sm} / {fonts.fontWeight.regular} /{" "}
            {fonts.lineHeight.relaxed}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: fonts.fontSize.xs,
              fontWeight: fonts.fontWeight.regular,
              lineHeight: fonts.lineHeight.normal,
            }}
            className="mb-2"
          >
            Extra Small Text
          </div>
          <div className="text-xs text-muted-foreground">
            {fonts.fontSize.xs} / {fonts.fontWeight.regular} /{" "}
            {fonts.lineHeight.normal}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FontFamilies: Story = {
  render: () => <FontFamilyDemo />,
};

export const FontSizes: Story = {
  render: () => <FontSizeDemo />,
};

export const FontWeights: Story = {
  render: () => <FontWeightDemo />,
};

export const LineHeights: Story = {
  render: () => <LineHeightDemo />,
};

export const TypographyScaleDemo: Story = {
  render: () => <TypographyScale />,
};

