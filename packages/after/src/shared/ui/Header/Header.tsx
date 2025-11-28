import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="shadow-sm sticky top-0 z-modal transition-colors" style={{
      backgroundColor: 'var(--color-bg-secondary)',
      borderBottom: '1px solid var(--color-border-secondary)'
    }}>
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            L
          </div>
          <div>
            <h1 className="text-lg font-bold m-0 leading-none" style={{ color: 'var(--color-text-heading)' }}>
              Hanghae Company
            </h1>
            <p className="text-[11px] m-0 leading-none mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-semibold" style={{ color: 'var(--color-text-heading)' }}>
              Demo User
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              demo@example.com
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center text-blue-500 dark:text-blue-300 font-semibold text-base">
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
