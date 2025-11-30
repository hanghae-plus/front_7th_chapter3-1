import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const getInitialTheme = () => {
  if (typeof window === "undefined") return false;
  const stored = window.localStorage.getItem("theme");
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={() => setIsDark((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-[color:var(--ds-color-border-subtle)] bg-[color:var(--ds-color-surface-base)] px-4 py-2 text-sm font-semibold text-[color:var(--ds-color-text-primary)] shadow-lg transition hover:bg-[color:var(--ds-color-neutral-100)] dark:hover:bg-[color:var(--ds-color-neutral-700)]"
      >
        {isDark ? (
          <>
            <Sun className="size-4" aria-hidden />
            라이트 모드
          </>
        ) : (
          <>
            <Moon className="size-4" aria-hidden />
            다크 모드
          </>
        )}
      </button>
    </div>
  );
};


