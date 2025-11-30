import { ThemeToggle } from "@/components/ThemeToggle";
import { AppHeader } from "@/components/layout/AppHeader";
import { ManagementPage } from "@/pages/ManagementPage";

export const App = () => {
  return (
    <div className="min-h-screen bg-muted/40">
      <AppHeader />
      <main>
        <ManagementPage />
      </main>
      <ThemeToggle />
    </div>
  );
};
