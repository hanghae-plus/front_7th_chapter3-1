import { useMemo } from "react";

interface ColorSwatchProps {
  label: string;
  value: string;
  variable?: string;
}

export const ColorSwatch = ({ label, value, variable }: ColorSwatchProps) => {
  const textColor = useMemo(() => {
    const hex = value.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0">
      <div
        className="w-20 h-20 rounded-md border border-gray-300 flex items-center justify-center relative group"
        style={{ backgroundColor: value }}
      >
        <span
          className="text-xs font-medium absolute top-1 left-1"
          style={{ color: textColor }}
        >
          {label}
        </span>
        {variable && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] px-1 py-0.5 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity truncate">
            {variable}
          </div>
        )}
      </div>
      <div className="text-xs text-gray-600 font-mono">{value}</div>
    </div>
  );
};

interface ColorScaleProps {
  name: string;
  colors: Array<{
    label: string;
    value: string;
    variable?: string;
  }>;
}

export const ColorScale = ({ name, colors }: ColorScaleProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold">{name}</h3>
      <div className="flex gap-1 overflow-x-auto pb-2 -mx-1 px-1">
        {colors.map((color) => (
          <ColorSwatch
            key={color.label}
            label={color.label}
            value={color.value}
            variable={color.variable}
          />
        ))}
      </div>
    </div>
  );
};

interface ColorPaletteProps {
  title: string;
  scales: Array<{
    name: string;
    colors: Array<{
      label: string;
      value: string;
      variable?: string;
    }>;
  }>;
}

export const ColorPalette = ({ title, scales }: ColorPaletteProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      {scales.map((scale) => (
        <ColorScale key={scale.name} name={scale.name} colors={scale.colors} />
      ))}
    </div>
  );
};
