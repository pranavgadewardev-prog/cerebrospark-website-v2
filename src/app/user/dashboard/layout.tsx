import Sidebar from "@/components/userdashboard/Sidebar";
import DashboardHeader from "@/components/userdashboard/DashboardHeader";
import RequireAuth from "@/components/auth/RequireAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />

        <div className="lg:pl-72">
          <DashboardHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </RequireAuth>
  );
}
