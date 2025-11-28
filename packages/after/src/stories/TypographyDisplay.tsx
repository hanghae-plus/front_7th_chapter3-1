import React from 'react';

interface TypographyDisplayProps {
  title: string;
  styles: Array<{
    name: string;
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
    lineHeight: number;
    description: string;
  }>;
  sampleText: string;
}

export const TypographyDisplay: React.FC<TypographyDisplayProps> = ({
  title,
  styles,
  sampleText,
}) => (
  <div style={{ marginBottom: '48px' }}>
    <h2
      style={{
        marginBottom: '32px',
        fontSize: '24px',
        fontWeight: 700,
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '12px',
      }}
    >
      {title}
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {styles.map((style) => (
        <div
          key={style.name}
          style={{
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            backgroundColor: '#fafafa',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '16px',
              fontSize: '13px',
              color: '#666',
            }}
          >
            <div>
              <strong style={{ color: '#333' }}>{style.name}</strong>
              <div style={{ marginTop: '4px', fontSize: '12px' }}>
                {style.description}
              </div>
            </div>
            <div style={{ textAlign: 'right', fontFamily: 'monospace' }}>
              <div>크기: {style.fontSize}px</div>
              <div>굵기: {style.fontWeight}</div>
              <div>행간: {style.lineHeight}</div>
            </div>
          </div>
          <div
            style={{
              fontSize: `${style.fontSize}px`,
              fontWeight: style.fontWeight,
              fontFamily: style.fontFamily,
              lineHeight: style.lineHeight,
              padding: '16px',
              backgroundColor: '#fff',
              borderRadius: '4px',
            }}
          >
            {sampleText}
          </div>
        </div>
      ))}
    </div>
  </div>
);
