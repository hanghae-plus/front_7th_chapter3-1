export function Profile() {
  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <div className="text-sm font-medium text-gray-900">Demo User</div>
        <div className="text-xs text-gray-500">demo@example.com</div>
      </div>
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-base font-bold">
        DU
      </div>
    </div>
  );
}
