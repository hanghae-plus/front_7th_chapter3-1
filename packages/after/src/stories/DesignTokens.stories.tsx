import type { Meta } from '@storybook/react-vite';

import { tokens } from '@/styles/tokens';

const meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
    <div 
      style={{ 
        width: '64px', 
        height: '64px', 
        borderRadius: '4px', 
        border: '1px solid #ddd',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        backgroundColor: color 
      }}
    />
    <div>
      <div style={{ fontWeight: 500, fontSize: '14px' }}>{name}</div>
      <div style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>{color}</div>
    </div>
  </div>
);

const SpacingItem = ({ value, name }: { value: string; name: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
    <div 
      style={{ 
        backgroundColor: '#3b82f6',
        width: value, 
        height: '20px',
        border: '1px solid #2563eb'
      }}
    />
    <div>
      <span style={{ fontWeight: 500, fontSize: '14px' }}>{name}</span>
      <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px', fontFamily: 'monospace' }}>{value}</span>
    </div>
  </div>
);

export const Colors = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Colors</h2>
        
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Primary</h3>
          {Object.entries(tokens.colors.primary).map(([key, value]) => (
            <ColorSwatch key={key} color={value} name={`primary.${key}`} />
          ))}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Secondary</h3>
          {Object.entries(tokens.colors.secondary).map(([key, value]) => (
            <ColorSwatch key={key} color={value} name={`secondary.${key}`} />
          ))}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Success</h3>
          {Object.entries(tokens.colors.success).map(([key, value]) => (
            <ColorSwatch key={key} color={value} name={`success.${key}`} />
          ))}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Danger</h3>
          {Object.entries(tokens.colors.danger).map(([key, value]) => (
            <ColorSwatch key={key} color={value} name={`danger.${key}`} />
          ))}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Warning</h3>
          {Object.entries(tokens.colors.warning).map(([key, value]) => (
            <ColorSwatch key={key} color={value} name={`warning.${key}`} />
          ))}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Info</h3>
          {Object.entries(tokens.colors.info).map(([key, value]) => (
            <ColorSwatch key={key} color={value} name={`info.${key}`} />
          ))}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Text</h3>
          {Object.entries(tokens.colors.text).map(([key, value]) => (
            <ColorSwatch key={key} color={value} name={`text.${key}`} />
          ))}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Border</h3>
          {Object.entries(tokens.colors.border).map(([key, value]) => (
            <ColorSwatch key={key} color={value} name={`border.${key}`} />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Spacing = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Spacing</h2>
      {Object.entries(tokens.spacing).map(([key, value]) => (
        <SpacingItem key={key} value={value} name={key} />
      ))}
    </div>
  ),
};

export const Typography = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Typography</h2>
        
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Font Sizes</h3>
          {Object.entries(tokens.typography.fontSize).map(([key, [size, lineHeight]]) => (
            <div key={key} style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: size, lineHeight, marginBottom: '4px' }}>
                The quick brown fox jumps over the lazy dog
              </div>
              <div style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>
                {key}: {size} / {lineHeight}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Font Weights</h3>
          {Object.entries(tokens.typography.fontWeight).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '8px' }}>
              <div style={{ fontWeight: value, fontSize: '18px' }}>
                Font Weight {key}
              </div>
              <div style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>
                {key}: {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const BorderRadius = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Border Radius</h2>
      {Object.entries(tokens.borderRadius).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div 
            style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: '#3b82f6',
              borderRadius: value 
            }}
          />
          <div>
            <div style={{ fontWeight: 500, fontSize: '14px' }}>{key}</div>
            <div style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>{value}</div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Shadows = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Shadows</h2>
      {Object.entries(tokens.shadows).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div 
            style={{ 
              width: '96px', 
              height: '96px', 
              backgroundColor: 'white',
              boxShadow: value 
            }}
          />
          <div>
            <div style={{ fontWeight: 500, fontSize: '14px' }}>{key}</div>
            <div style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace', maxWidth: '400px', wordBreak: 'break-all' }}>
              {value}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

