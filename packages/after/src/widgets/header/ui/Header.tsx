import { Profile } from "@/features/user/ui";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold text-lg">
            L
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">
              Hanghae Company
            </h1>
            <p className="text-sm text-gray-500 leading-none mt-1">
              Design System Migration Project
            </p>
          </div>
        </div>

        <Profile />
      </div>
    </header>
  );
}
