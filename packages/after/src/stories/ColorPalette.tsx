import React from 'react';

interface ColorSwatchProps {
  name: string;
  value: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, value }) => (
  <div style={{ marginBottom: '16px' }}>
    <div
      style={{
        width: '100%',
        height: '60px',
        backgroundColor: value,
        borderRadius: '4px',
        border: '1px solid rgba(0,0,0,0.1)',
        marginBottom: '8px',
      }}
    />
    <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
      {name}
    </div>
    <div style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>
      {value}
    </div>
  </div>
);

interface ColorPaletteProps {
  title: string;
  subtitle?: string;
  colors: Record<string, string>;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  title,
  subtitle,
  colors,
}) => (
  <div style={{ marginBottom: '48px' }}>
    <h3 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 600 }}>
      {title}
    </h3>
    {subtitle && (
      <p style={{ marginBottom: '24px', color: '#666', fontSize: '14px' }}>
        {subtitle}
      </p>
    )}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '24px',
      }}
    >
      {Object.entries(colors).map(([name, value]) => (
        <ColorSwatch key={name} name={name} value={value} />
      ))}
    </div>
  </div>
);
