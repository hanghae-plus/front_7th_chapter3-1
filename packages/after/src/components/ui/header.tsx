import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { useTheme } from "../../hooks/use-theme";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, ...props }, ref) => {
    const { theme, toggleTheme } = useTheme();

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
              L
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-foreground">
                Hanghae Company
              </h1>
              <p className="text-xs leading-none text-muted-foreground mt-0.5">
                Design System Migration Project
              </p>
            </div>
          </div>

          {/* User Info + Theme Toggle */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={`Current theme: ${theme}`}
            >
              {/* Sun icon for light mode */}
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </Button>

            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">
                Demo User
              </div>
              <div className="text-xs text-muted-foreground">
                demo@example.com
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
              DU
            </div>
          </div>
        </div>
      </header>
    );
  }
);
Header.displayName = "Header";
