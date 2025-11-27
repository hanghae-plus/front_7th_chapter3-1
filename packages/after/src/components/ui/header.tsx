import * as React from 'react';

import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  return (
    <header
      className={cn(
        'sticky top-0 z-(--z-modal)',
        'bg-(--color-bg-card) border-b border-(--color-border-card) shadow-(--shadow-card-default)'
      )}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-[24px]" style={{ height: '64px' }}>
        <div className="flex items-center gap-[12px]">
          <div
            className="flex items-center justify-center rounded-[8px] bg-(--color-primary) text-(--color-text-inverse) font-bold text-[20px]"
            style={{ width: 'var(--size-logo-square-md)', height: 'var(--size-logo-square-md)' }}
          >
            L
          </div>
          <div className="leading-none">
            <h1 className="m-0 text-[18px] font-bold text-(--color-text-card-title)">Hanghae Company</h1>
            <p className="m-0 mt-[2px] text-[11px] text-(--color-text-muted)">Design System Migration Project</p>
          </div>
        </div>

        <div className="flex items-center gap-[12px]">
          <div className="text-right leading-none">
            <div className="text-[14px] font-semibold text-(--color-text-card-title)">Demo User</div>
            <div className="text-[12px] text-(--color-text-muted)">demo@example.com</div>
          </div>
          <div
            className="flex items-center justify-center rounded-full bg-(--color-alert-info-bg) text-(--color-primary) font-semibold text-[16px]"
            style={{ width: 'var(--size-avatar-md)', height: 'var(--size-avatar-md)' }}
          >
            DU
          </div>
        </div>
      </div>
    </header>
  );
};

