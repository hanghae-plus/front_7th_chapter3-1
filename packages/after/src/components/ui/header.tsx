import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks';

type HeaderProps = {
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        'border-b border-[var(--color-border)]',
        'bg-[var(--color-background)]',
        'shadow-[var(--shadow-sm)]',
        className,
      )}
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between" style={{ height: '72px', padding: '0 var(--spacing-layout-md)' }}>
        <div className="flex items-center gap-[var(--spacing-component-md)]">
          <div 
            className="flex items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
            style={{
              height: '48px',
              width: '48px',
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-bold)',
            }}
          >
            L
          </div>
          <div className="leading-tight">
            <h1 
              className="text-[var(--color-foreground)]"
              style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-bold)',
              }}
            >
              Hanghae Company
            </h1>
            <p 
              className="text-[var(--color-foreground-muted)]"
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-normal)',
              }}
            >
              Design System Migration Project
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[var(--spacing-component-md)]">
          {/* 다크모드 토글 버튼 */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-[var(--radius-lg)] border transition-colors hover:bg-[var(--color-background-muted)]"
            style={{
              height: '40px',
              width: '40px',
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-foreground)',
              cursor: 'pointer',
            }}
            aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {isDark ? (
              <Sun style={{ width: '20px', height: '20px' }} />
            ) : (
              <Moon style={{ width: '20px', height: '20px' }} />
            )}
          </button>

          <div className="text-right leading-tight">
            <div 
              className="text-[var(--color-foreground)]"
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              Demo User
            </div>
            <div 
              className="text-[var(--color-foreground-muted)]"
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-normal)',
              }}
            >
              demo@example.com
            </div>
          </div>
          <div 
            className="flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
            style={{
              height: '48px',
              width: '48px',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
