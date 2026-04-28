import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import RequireAdmin from "@/components/auth/RequireAdmin";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAdmin>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />

        <div className="lg:pl-72">
          <AdminHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </RequireAdmin>
  );
}
