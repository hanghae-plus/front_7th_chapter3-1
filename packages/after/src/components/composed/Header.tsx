function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground">
            L
          </div>
          <div className="leading-none">
            <h1 className="m-0 text-[18px] font-bold text-foreground">Hanghae Company</h1>
            <p className="mt-[2px] text-[11px] text-foreground/60">Design System Migration Project</p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[14px] font-semibold text-foreground">Demo User</div>
            <div className="text-[12px] text-foreground/60">demo@example.com</div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-[16px] font-semibold text-primary">
            DU
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
