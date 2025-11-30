export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--ds-color-border-subtle)] bg-[var(--ds-color-surface-base)] shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-[color:var(--ds-color-text-inverse)]"
            style={{ backgroundColor: "var(--ds-color-brand-accent-500)" }}
          >
            L
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none text-[color:var(--ds-color-text-strong)]">
              Hanghae Company
            </h1>
            <p className="mt-0.5 text-[11px] leading-none text-[color:var(--ds-color-text-subtle)]">
              Design System Migration Project
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-semibold text-[color:var(--ds-color-text-strong)]">Demo User</div>
            <div className="text-xs text-[color:var(--ds-color-text-subtle)]">demo@example.com</div>
          </div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full font-semibold text-[color:var(--ds-color-brand-primary-600)]"
            style={{ backgroundColor: "var(--ds-color-brand-primary-50)" }}
          >
            DU
          </div>
        </div>
      </div>
    </header>
  );
};

