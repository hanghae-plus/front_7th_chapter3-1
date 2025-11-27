import { Moon, Sun } from "lucide-react";
import { Button } from "../Button";
import { useDarkMode } from "../../utils/useDarkMode";

export function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
