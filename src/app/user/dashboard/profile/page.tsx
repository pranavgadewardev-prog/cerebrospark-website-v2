export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        <p className="text-gray-600 mt-1">
          This is a placeholder profile page. We will connect Firebase data later.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900">Profile Info</h3>

        <div className="mt-4 space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span> Test User
          </p>
          <p>
            <span className="font-semibold">Email:</span> user@example.com
          </p>
          <p>
            <span className="font-semibold">Role:</span> user
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          (We will replace this with Firestore user data in next step.)
        </p>
      </div>
    </div>
  );
}
