export const tokens = {
  colors: {
    primary: {
      500: '#1976d2', 
      600: '#1565c0', 
    },
    
    secondary: {
      100: '#f5f5f5',
      200: '#e0e0e0',
      500: '#757575',
      text: '#333',
      border: '#ddd',
    },
    
    success: {
      500: '#388e3c',
      600: '#2e7d32',
      light: '#e8f5e9',
      border: '#81c784',
      text: '#1b5e20',
    },

    danger: {
      500: '#d32f2f',
      600: '#c62828',
      700: '#b71c1c',
      light: '#ffebee',
      border: '#e57373',
      text: '#b71c1c',
      error: '#ef4444',
    },
    
    warning: {
      500: '#f57c00',
      light: '#fff3e0',
      border: '#ffb74d',
      text: '#e65100',
    },
    
    info: {
      500: '#0288d1',
      light: '#e3f2fd',
      border: '#90caf9',
      text: '#0d47a1',
    },
    
    neutral: {
      100: '#f5f5f5',
      300: '#bdbdbd',
      700: '#424242',
      gray: '#d1d5db', 
      grayText: '#374151',
      grayHint: '#6b7280',
    },
    
    white: '#fff',
    black: '#000',
    
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: '#666',
    },
    
    border: {
      default: '#ccc',
      light: 'rgba(0, 0, 0, 0.12)',
      medium: 'rgba(0, 0, 0, 0.23)',
      dark: 'rgba(0, 0, 0, 0.54)',
      subtle: 'rgba(0, 0, 0, 0.08)',
    },
    
    background: {
      default: '#fff',
      paper: '#fafafa',
      disabled: 'rgba(0, 0, 0, 0.12)',
      overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlay
      hover: 'rgba(0, 0, 0, 0.04)', // Table hover
    },
  },
  
  spacing: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '10px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '20px',
    '4xl': '24px',
    '5xl': '32px',
    '13px': '13px',
    '14px': '14px',
    '15.5px': '15.5px',
    '16.5px': '16.5px',
  },
  
  typography: {
    fontFamily: {
      sans: ['Arial', 'sans-serif'],
      roboto: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },
    fontSize: {
      xs: '0.625rem',    // 10px - Badge small, Checkbox checkmark
      sm: '0.75rem',     // 12px - Helper text, Checkbox hint/error
      base: '0.8125rem', // 13px - Button sm, Form label
      md: '0.875rem',    // 14px - Button md, Form input, Table body
      lg: '0.9375rem',   // 15px - Button lg, Alert title
      xl: '1rem',        // 16px - Textarea
      '2xl': '1.125rem', // 18px - Card title
      '3xl': '1.25rem',  // 20px - Modal title
      '20px': '20px',    // Alert icon, Close button
      '28px': '28px',    // Modal close icon
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700',
    },
    lineHeight: {
      tight: '1',
      normal: '1.4',
      relaxed: '1.5',
      loose: '1.6',
      textarea: '1.1876em',
      cardSubtitle: '1.43',
    },
  },
  
  borderRadius: {
    none: '0',
    sm: '2px',   // Checkbox
    md: '3px',   // Button, Badge, Alert, Form input
    lg: '4px',   // Card, Textarea, Modal
    xl: '10px',  // Badge pill
    full: '50%', // Modal close button
  },
  
  shadows: {
    none: 'none',
    // Card default shadow
    md: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    // Card elevated shadow
    lg: '0px 2px 4px -1px rgba(0,0,0,0.12), 0px 1px 2px 0px rgba(0,0,0,0.08), 0px 1px 4px 0px rgba(0,0,0,0.08)',
    // Modal shadow
    xl: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
  },
  
  width: {
    small: '200px',
    medium: '300px',
    large: '400px',
    full: '100%',
    modalSmall: '400px',
    modalMedium: '600px',
    modalLarge: '900px',
  },
  
  height: {
    badgeSmall: '16px',
    badgeMedium: '20px',
    badgeLarge: '24px',
    checkbox: '16px',
    modalClose: '32px',
  },
} as const
