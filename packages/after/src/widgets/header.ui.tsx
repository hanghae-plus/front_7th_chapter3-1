import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-1000 border-b border-border bg-background shadow-xs">
      <div className="px-xl mx-auto flex h-16 max-w-[1400px] items-center justify-between">
        {/* Logo */}
        <div className="gap-base flex items-center">
          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg text-2xl font-bold text-white">
            L
          </div>
          <div>
            <h1 className="h6 m-0 leading-none text-foreground">
              Hanghae Company
            </h1>
            <p className="caption-sm m-0 mt-[2px] leading-none text-muted-foreground">
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="gap-base flex items-center">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-hover"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-foreground-medium" />
            ) : (
              <Moon className="h-5 w-5 text-foreground-medium" />
            )}
          </button>

          <div className="text-right">
            <div className="body-base font-semibold text-foreground">
              Demo User
            </div>
            <div className="caption text-muted-foreground">demo@example.com</div>
          </div>
          <div className="bg-primary-weak text-primary flex h-10 w-10 items-center justify-center rounded-full text-lg font-medium">
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
