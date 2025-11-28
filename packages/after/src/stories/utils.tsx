import type { ReactNode } from 'react';

// Storybook stories용 레이아웃 wrapper 컴포넌트들
export const FlexRow = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`flex gap-2 ${className}`}>{children}</div>
);

export const FlexRowCenter = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>{children}</div>
);

export const FlexCol = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`flex flex-col gap-3 ${className}`}>{children}</div>
);

export const FlexColGap4 = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`flex flex-col gap-4 ${className}`}>{children}</div>
);

