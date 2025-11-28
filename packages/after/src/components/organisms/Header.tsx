import React from 'react';
import { IconButton } from '../ui/IconButton';
import { Moon, Sun } from 'lucide-react';

export const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    // 시스템 설정 확인
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  React.useEffect(() => {
    // 시스템 설정 변경 감지
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border-base)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#007bff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            L
          </div>
          <div>
            <h1
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                margin: 0,
                lineHeight: 1,
              }}
            >
              Hanghae Company
            </h1>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--color-text-secondary)',
                margin: 0,
                lineHeight: 1,
                marginTop: '2px',
              }}
            >
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-text-primary)',
              }}
            >
              Demo User
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
              }}
            >
              demo@example.com
            </div>
          </div>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#e3f2fd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#007bff',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            DU
          </div>
          <IconButton
            variant="secondary"
            size="md"
            icon={
              isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            }
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
          />
        </div>
      </div>
    </header>
  );
};
