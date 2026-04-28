export default function DashboardHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold text-gray-900">
          User Dashboard
        </h1>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">
            Welcome 👋
          </div>

          <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-gray-900">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
