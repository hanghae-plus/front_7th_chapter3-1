/**
 * Typography Tokens
 * Extracted from src/app/styles/index.css and src/app/styles/utilities/typography.css
 */

export const typography = {
  // Font Families
  type: {
    sans: 'Arial, sans-serif',
    roboto: '"Roboto", "Helvetica", "Arial", sans-serif',
  },

  // Font Weights
  weight: {
    normal: '400',
    medium: '500',
    bold: '700',
  },

  // Font Sizes (in pixels)
  size: {
    // Headings (used in h1-h6 utilities)
    h1: 48, // --text-7xl / --font-size-48
    h2: 40, // --text-6xl / --font-size-40
    h3: 32, // --text-5xl / --font-size-32
    h4: 28, // --text-4xl / --font-size-28
    h5: 24, // --text-3xl / --font-size-24
    h6: 20, // --text-2xl / --font-size-20

    // Body text (used in body-* utilities)
    bodyLg: 16, // --text-lg / --font-size-16
    bodyMd: 15, // --text-md / --font-size-15
    bodyBase: 14, // --text-base / --font-size-14
    bodySm: 13, // --text-sm / --font-size-13

    // Labels and captions
    labelLg: 14, // --text-base / --font-size-14
    labelMd: 13, // --text-sm / --font-size-13
    labelSm: 12, // --text-xs / --font-size-12
    caption: 12, // --text-xs / --font-size-12
    captionSm: 10, // --text-2xs / --font-size-10

    // Additional sizes
    xs: 12, // --text-xs / --font-size-12
    sm: 13, // --text-sm / --font-size-13
    base: 14, // --text-base / --font-size-14
    md: 15, // --text-md / --font-size-15
    lg: 16, // --text-lg / --font-size-16
    xl: 18, // --text-xl / --font-size-18
    '2xl': 20, // --text-2xl / --font-size-20
    '3xl': 24, // --text-3xl / --font-size-24
    '4xl': 28, // --text-4xl / --font-size-28
    '5xl': 32, // --text-5xl / --font-size-32
    '6xl': 40, // --text-6xl / --font-size-40
    '7xl': 48, // --text-7xl / --font-size-48
  },

  // Line Heights
  lineHeight: {
    none: 1, // --line-height-none
    tight: 1.1876, // --line-height-tight (used in h1-h3, labels)
    snug: 1.4, // --line-height-snug (used in h4-h6)
    normal: 1.43, // --line-height-normal (used in body-base, body-sm, labels)
    relaxed: 1.5, // --line-height-relaxed (used in body-lg, body-md)
    loose: 1.6, // --line-height-loose
  },
};

// Typography utility classes as defined in typography.css
export const typographyUtilities = {
  headings: [
    {
      name: 'h1',
      fontFamily: typography.type.roboto,
      fontSize: typography.size.h1,
      lineHeight: typography.lineHeight.tight,
      fontWeight: typography.weight.bold,
      description: '48px / Bold / Tight line height',
    },
    {
      name: 'h2',
      fontFamily: typography.type.roboto,
      fontSize: typography.size.h2,
      lineHeight: typography.lineHeight.tight,
      fontWeight: typography.weight.bold,
      description: '40px / Bold / Tight line height',
    },
    {
      name: 'h3',
      fontFamily: typography.type.roboto,
      fontSize: typography.size.h3,
      lineHeight: typography.lineHeight.tight,
      fontWeight: typography.weight.bold,
      description: '32px / Bold / Tight line height',
    },
    {
      name: 'h4',
      fontFamily: typography.type.roboto,
      fontSize: typography.size.h4,
      lineHeight: typography.lineHeight.snug,
      fontWeight: typography.weight.bold,
      description: '28px / Bold / Snug line height',
    },
    {
      name: 'h5',
      fontFamily: typography.type.roboto,
      fontSize: typography.size.h5,
      lineHeight: typography.lineHeight.snug,
      fontWeight: typography.weight.medium,
      description: '24px / Medium / Snug line height',
    },
    {
      name: 'h6',
      fontFamily: typography.type.roboto,
      fontSize: typography.size.h6,
      lineHeight: typography.lineHeight.snug,
      fontWeight: typography.weight.medium,
      description: '20px / Medium / Snug line height',
    },
  ],

  body: [
    {
      name: 'body-lg',
      fontFamily: typography.type.sans,
      fontSize: typography.size.bodyLg,
      lineHeight: typography.lineHeight.relaxed,
      fontWeight: typography.weight.normal,
      description: '16px / Normal / Relaxed line height',
    },
    {
      name: 'body-md',
      fontFamily: typography.type.sans,
      fontSize: typography.size.bodyMd,
      lineHeight: typography.lineHeight.relaxed,
      fontWeight: typography.weight.normal,
      description: '15px / Normal / Relaxed line height',
    },
    {
      name: 'body-base',
      fontFamily: typography.type.sans,
      fontSize: typography.size.bodyBase,
      lineHeight: typography.lineHeight.normal,
      fontWeight: typography.weight.normal,
      description: '14px / Normal / Normal line height',
    },
    {
      name: 'body-sm',
      fontFamily: typography.type.sans,
      fontSize: typography.size.bodySm,
      lineHeight: typography.lineHeight.normal,
      fontWeight: typography.weight.normal,
      description: '13px / Normal / Normal line height',
    },
  ],

  labels: [
    {
      name: 'label-lg',
      fontFamily: typography.type.sans,
      fontSize: typography.size.labelLg,
      lineHeight: typography.lineHeight.normal,
      fontWeight: typography.weight.bold,
      description: '14px / Bold / Normal line height',
    },
    {
      name: 'label-md',
      fontFamily: typography.type.sans,
      fontSize: typography.size.labelMd,
      lineHeight: typography.lineHeight.normal,
      fontWeight: typography.weight.bold,
      description: '13px / Bold / Normal line height',
    },
    {
      name: 'label-sm',
      fontFamily: typography.type.sans,
      fontSize: typography.size.labelSm,
      lineHeight: typography.lineHeight.tight,
      fontWeight: typography.weight.bold,
      description: '12px / Bold / Tight line height',
    },
  ],

  captions: [
    {
      name: 'caption',
      fontFamily: typography.type.sans,
      fontSize: typography.size.caption,
      lineHeight: typography.lineHeight.tight,
      fontWeight: typography.weight.normal,
      description: '12px / Normal / Tight line height',
    },
    {
      name: 'caption-sm',
      fontFamily: typography.type.sans,
      fontSize: typography.size.captionSm,
      lineHeight: typography.lineHeight.tight,
      fontWeight: typography.weight.normal,
      description: '10px / Normal / Tight line height',
    },
  ],
};

export const SampleText = '디자인 시스템 타이포그라피를 확인하기 위한 예시 문장입니다.';
export const SampleTextEn = 'The quick brown fox jumps over the lazy dog.';
