export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Home</h2>
        <p className="text-gray-600 mt-1">
          This is your main dashboard page. We’ll add more sections later.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Orders</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">0</h3>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Wishlist</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">0</h3>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Support Tickets</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">0</h3>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          What’s next?
        </h3>
        <p className="text-gray-600 mt-2">
          We will add Orders, Wishlist, Cart, Payments, and Drone Product details here.
        </p>
      </div>
    </div>
  );
}
