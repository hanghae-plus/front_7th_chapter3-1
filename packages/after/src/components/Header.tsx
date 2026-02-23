import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

interface HeaderProps {
  logoText?: string;
  companyName?: string;
  companyDescription?: string;
  userName?: string;
  userEmail?: string;
  userInitials?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logoText = "L",
  companyName = "Hanghae Company",
  companyDescription = "Design System Migration Project",
  userName = "Demo User",
  userEmail = "demo@example.com",
  userInitials = "DU",
}) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    // localStorage에서 저장된 테마 읽기
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme === "dark";
    }

    // 저장된 테마가 없으면 시스템 설정 확인
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark;
  });

  // 초기 마운트 시 localStorage 값 적용
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const root = document.documentElement;

    if (storedTheme === "dark") {
      root.classList.add("dark");
      setIsDark(true);
    } else if (storedTheme === "light") {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      // 저장된 테마가 없으면 시스템 설정 적용
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        root.classList.add("dark");
        setIsDark(true);
      } else {
        root.classList.remove("dark");
        setIsDark(false);
      }
    }
  }, []);

  // isDark 상태 변경 시 DOM과 localStorage 업데이트
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleThemeToggle = (checked: boolean) => {
    setIsDark(checked);
  };

  return (
    <header
      className="sticky top-0 z-[1] border-b border-border bg-app-background shadow-sm"
      role="banner"
      aria-label="사이트 헤더"
    >
      <div className="mx-auto flex max-w-[1400px] items-end justify-between p-6">
        <div className="flex items-center flex-wrap gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-app-primary-foreground"
            role="img"
            aria-label={`${companyName} 로고`}
          >
            {logoText}
          </div>
          <div>
            <h1 className="m-0 text-lg font-bold leading-none text-app-foreground">
              {companyName}
            </h1>
            <p className="mt-2 text-[11px] leading-none text-app-muted-foreground">
              {companyDescription}
            </p>
          </div>
        </div>

        <nav
          className="flex items-center justify-end flex-wrap gap-4"
          aria-label="사용자 메뉴"
        >
          <div className="flex items-center gap-2">
            <Sun
              className="size-4 text-app-muted-foreground"
              aria-hidden="true"
            />
            <Switch
              checked={isDark}
              onCheckedChange={handleThemeToggle}
              aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
              aria-pressed={isDark}
            />
            <Moon
              className="size-4 text-app-muted-foreground"
              aria-hidden="true"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-app-foreground">
                {userName}
              </div>
              <div className="text-xs text-app-muted-foreground">
                {userEmail}
              </div>
            </div>
            <div
              className="flex size-10 items-center justify-center rounded-full bg-info/20 text-base font-semibold text-info"
              role="img"
              aria-label={`${userName} 아바타`}
            >
              {userInitials}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
