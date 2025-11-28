import { writeFileSync } from 'fs';
import { join } from 'path';

// 생성 범위 (원하면 200, 500, 1000 등으로 변경)
const MAX_PX = 200;

// px → rem 변환
const pxToRem = (px: number) => `${px / 16}rem`;

// pxr 토큰 생성
function generatePxrTokens(maxPx: number) {
  const lines = [];

  for (let px = 0; px <= maxPx; px++) {
    lines.push(`  --pxr-${px}: ${pxToRem(px)};`);
  }

  return lines.join('\n');
}

// @utility 지시문 생성
function generateUtilities() {
  return `
/* Custom utilities using @utility directive */
/* Padding utilities */
@utility p-pxr-* {
  padding: --value(--pxr-*);
}

@utility pt-pxr-* {
  padding-top: --value(--pxr-*);
}

@utility pr-pxr-* {
  padding-right: --value(--pxr-*);
}

@utility pb-pxr-* {
  padding-bottom: --value(--pxr-*);
}

@utility pl-pxr-* {
  padding-left: --value(--pxr-*);
}

@utility px-pxr-* {
  padding-left: --value(--pxr-*);
  padding-right: --value(--pxr-*);
}

@utility py-pxr-* {
  padding-top: --value(--pxr-*);
  padding-bottom: --value(--pxr-*);
}

/* Margin utilities */
@utility m-pxr-* {
  margin: --value(--pxr-*);
}

@utility mt-pxr-* {
  margin-top: --value(--pxr-*);
}

@utility mr-pxr-* {
  margin-right: --value(--pxr-*);
}

@utility mb-pxr-* {
  margin-bottom: --value(--pxr-*);
}

@utility ml-pxr-* {
  margin-left: --value(--pxr-*);
}

@utility mx-pxr-* {
  margin-left: --value(--pxr-*);
  margin-right: --value(--pxr-*);
}

@utility my-pxr-* {
  margin-top: --value(--pxr-*);
  margin-bottom: --value(--pxr-*);
}

/* Gap utilities */
@utility gap-pxr-* {
  gap: --value(--pxr-*);
}

@utility gap-x-pxr-* {
  column-gap: --value(--pxr-*);
}

@utility gap-y-pxr-* {
  row-gap: --value(--pxr-*);
}

/* Width & Height utilities */
@utility w-pxr-* {
  width: --value(--pxr-*);
}

@utility h-pxr-* {
  height: --value(--pxr-*);
}

@utility min-w-pxr-* {
  min-width: --value(--pxr-*);
}

@utility max-w-pxr-* {
  max-width: --value(--pxr-*);
}

@utility min-h-pxr-* {
  min-height: --value(--pxr-*);
}

@utility max-h-pxr-* {
  max-height: --value(--pxr-*);
}

@utility size-pxr-* {
  width: --value(--pxr-*);
  height: --value(--pxr-*);
}

/* Text size utilities */
@utility text-pxr-* {
  font-size: --value(--pxr-*);
}

@utility leading-pxr-* {
  line-height: --value(--pxr-*);
}

/* Border utilities */
@utility rounded-pxr-* {
  border-radius: --value(--pxr-*);
}

@utility border-pxr-* {
  border-width: --value(--pxr-*);
}

/* Position utilities */
@utility top-pxr-* {
  top: --value(--pxr-*);
}

@utility right-pxr-* {
  right: --value(--pxr-*);
}

@utility bottom-pxr-* {
  bottom: --value(--pxr-*);
}

@utility left-pxr-* {
  left: --value(--pxr-*);
}

@utility inset-pxr-* {
  inset: --value(--pxr-*);
}`.trim();
}

// 출력 파일 경로
const OUTPUT = join(process.cwd(), './pxr-tokens.css');

// 최종 CSS 내용
const css = `/* AUTO-GENERATED — DO NOT EDIT */
/* PXR Utilities for Tailwind CSS v4 */
@theme {
${generatePxrTokens(MAX_PX)}
}

${generateUtilities()}`;

// 파일 생성
writeFileSync(OUTPUT, css);
console.log(`✓ pxr tokens generated → ${OUTPUT}`);
