import type { Meta, StoryObj } from "@storybook/react";
import { colors } from "./colors";

const meta = {
  title: "Design Tokens/Colors",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorSwatch = ({
  colorValue,
  shade,
}: {
  colorValue: string;
  shade: number;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
    }}
  >
    <div
      style={{
        width: "64px",
        height: "64px",
        borderRadius: "8px",
        border: "2px solid #d1d5db",
        backgroundColor: colorValue,
        background: colorValue,
      }}
    />
    <div style={{ fontSize: "12px", fontWeight: 600 }}>{shade}</div>
    <div
      style={{ fontSize: "10px", color: "#6b7280", fontFamily: "monospace" }}
    >
      {colorValue}
    </div>
  </div>
);

const ColorPaletteSection = ({
  name,
  palette,
  darkPalette,
}: {
  name: string;
  palette: any;
  darkPalette?: any;
}) => {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <div style={{ marginBottom: "48px" }}>
      <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
        {name}
      </h3>
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {shades.map((shade) => {
          const colorValue = palette[shade];
          if (!colorValue) return null;
          return (
            <ColorSwatch key={shade} colorValue={colorValue} shade={shade} />
          );
        })}
      </div>
      {darkPalette && (
        <>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#4b5563",
            }}
          >
            Dark Mode
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {shades.map((shade) => {
              const colorValue = darkPalette[shade];
              if (!colorValue) return null;
              return (
                <ColorSwatch
                  key={shade}
                  colorValue={colorValue}
                  shade={shade}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export const ColorPalettes: Story = {
  render: () => (
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Color Palettes
      </h2>
      <ColorPaletteSection
        name="Blue"
        palette={colors.blue}
        darkPalette={colors.dark.blue}
      />
      <ColorPaletteSection
        name="Yellow"
        palette={colors.yellow}
        darkPalette={colors.dark.yellow}
      />
      <ColorPaletteSection
        name="Green"
        palette={colors.green}
        darkPalette={colors.dark.green}
      />
      <ColorPaletteSection
        name="Red"
        palette={colors.red}
        darkPalette={colors.dark.red}
      />
      <ColorPaletteSection
        name="Gray"
        palette={colors.gray}
        darkPalette={colors.dark.gray}
      />
    </div>
  ),
};

export const SemanticColors: Story = {
  render: () => (
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Semantic Colors
      </h2>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
          Primary
        </h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Light Mode
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor: colors.primary.DEFAULT,
                color: colors.primary.foreground,
              }}
            >
              <div style={{ fontWeight: 600 }}>Sample Text</div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Foreground: {colors.primary.foreground}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Background: {colors.primary.DEFAULT}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Dark Mode
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor: colors.primary.dark.DEFAULT,
                color: colors.primary.dark.foreground,
              }}
            >
              <div style={{ fontWeight: 600 }}>Sample Text</div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Foreground: {colors.primary.dark.foreground}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Background: {colors.primary.dark.DEFAULT}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
          Secondary
        </h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Light Mode
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor: colors.secondary.DEFAULT,
                color: colors.secondary.foreground,
              }}
            >
              <div style={{ fontWeight: 600 }}>Sample Text</div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Foreground: {colors.secondary.foreground}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Background: {colors.secondary.DEFAULT}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Dark Mode
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor: colors.secondary.dark.DEFAULT,
                color: colors.secondary.dark.foreground,
              }}
            >
              <div style={{ fontWeight: 600 }}>Sample Text</div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Foreground: {colors.secondary.dark.foreground}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Background: {colors.secondary.dark.DEFAULT}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
          Success
        </h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Light Mode
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor: colors.success.DEFAULT,
                color: colors.success.foreground,
              }}
            >
              <div style={{ fontWeight: 600 }}>Sample Text</div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Foreground: {colors.success.foreground}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Background: {colors.success.DEFAULT}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Dark Mode
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor: colors.success.dark.DEFAULT,
                color: colors.success.dark.foreground,
              }}
            >
              <div style={{ fontWeight: 600 }}>Sample Text</div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Foreground: {colors.success.dark.foreground}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Background: {colors.success.dark.DEFAULT}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
          Warning
        </h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Light Mode
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor: colors.warning.DEFAULT,
                color: colors.warning.foreground,
              }}
            >
              <div style={{ fontWeight: 600 }}>Sample Text</div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Foreground: {colors.warning.foreground}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Background: {colors.warning.DEFAULT}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Dark Mode
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor: colors.warning.dark.DEFAULT,
                color: colors.warning.dark.foreground,
              }}
            >
              <div style={{ fontWeight: 600 }}>Sample Text</div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Foreground: {colors.warning.dark.foreground}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Background: {colors.warning.dark.DEFAULT}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
          Danger
        </h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Light Mode
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor: colors.danger.DEFAULT,
                color: colors.danger.foreground,
              }}
            >
              <div style={{ fontWeight: 600 }}>Sample Text</div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Foreground: {colors.danger.foreground}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Background: {colors.danger.DEFAULT}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Dark Mode
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor: colors.danger.dark.DEFAULT,
                color: colors.danger.dark.foreground,
              }}
            >
              <div style={{ fontWeight: 600 }}>Sample Text</div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Foreground: {colors.danger.dark.foreground}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Background: {colors.danger.dark.DEFAULT}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
          Info
        </h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Light Mode
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor: colors.info.DEFAULT,
                color: colors.info.foreground,
              }}
            >
              <div style={{ fontWeight: 600 }}>Sample Text</div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Foreground: {colors.info.foreground}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Background: {colors.info.DEFAULT}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Dark Mode
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                backgroundColor: colors.info.dark.DEFAULT,
                color: colors.info.dark.foreground,
              }}
            >
              <div style={{ fontWeight: 600 }}>Sample Text</div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Foreground: {colors.info.dark.foreground}
              </div>
              <div style={{ fontSize: "14px", marginTop: "4px" }}>
                Background: {colors.info.dark.DEFAULT}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

const SystemColorItem = ({
  name,
  colorValue,
}: {
  name: string;
  colorValue: string;
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
    }}
  >
    <div
      style={{
        width: "64px",
        height: "64px",
        borderRadius: "4px",
        border: "1px solid #e5e7eb",
        backgroundColor: colorValue,
        background: colorValue,
        flexShrink: 0,
      }}
    />
    <div>
      <div style={{ fontWeight: 600 }}>{name}</div>
      <div
        style={{ fontSize: "14px", color: "#6b7280", fontFamily: "monospace" }}
      >
        {colorValue}
      </div>
    </div>
  </div>
);

export const SystemColors: Story = {
  render: () => (
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        System Colors
      </h2>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
      >
        <div>
          <h3
            style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}
          >
            Light Mode
          </h3>
          <SystemColorItem
            name="Background"
            colorValue={colors.background.light}
          />
          <SystemColorItem
            name="Foreground"
            colorValue={colors.foreground.light}
          />
          <SystemColorItem name="Card" colorValue={colors.card.light} />
          <SystemColorItem name="Muted" colorValue={colors.muted.light} />
          <SystemColorItem name="Accent" colorValue={colors.accent.light} />
          <SystemColorItem name="Input" colorValue={colors.input.light} />
        </div>
        <div>
          <h3
            style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}
          >
            Dark Mode
          </h3>
          <SystemColorItem
            name="Background"
            colorValue={colors.background.dark}
          />
          <SystemColorItem
            name="Foreground"
            colorValue={colors.foreground.dark}
          />
          <SystemColorItem name="Card" colorValue={colors.card.dark} />
          <SystemColorItem name="Muted" colorValue={colors.muted.dark} />
          <SystemColorItem name="Accent" colorValue={colors.accent.dark} />
          <SystemColorItem name="Input" colorValue={colors.input.dark} />
        </div>
      </div>
    </div>
  ),
};
