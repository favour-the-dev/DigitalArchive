import DashboardHeader from "@/app/components/header";
import AdminCard from "@/app/components/admin/dashboard/card";
import { Users, File, AlertTriangle, Download } from "lucide-react";
function AdminDashboard() {
  return (
    <section className="w-full h-full p-3 flex flex-col gap-4">
      <DashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AdminCard
          icon={<Users />}
          color="bg-blue-500"
          textColor="text-blue-500"
          title="Total Users"
          value="254"
          href="/admin/user-management"
          label="View all users →"
        />
        <AdminCard
          icon={<File />}
          color="bg-green-500"
          textColor="text-green-500"
          title="Documents"
          value="1,423"
          href="/admin/documents-management"
          label="View all documents →"
        />
        <AdminCard
          icon={<AlertTriangle />}
          color="bg-yellow-100"
          iconColor="text-yellow-800"
          textColor="text-yellow-100"
          title="Pending Approvals"
          value="12"
          href="/admin/content-approvals"
          label="Review pending →"
        />
        <AdminCard
          icon={<Download />}
          color="bg-brightPurple"
          textColor="text-brightPurple"
          title="Total Downloads"
          value="8,521"
          href="/admin/system-logs"
          label="View statistics →"
        />
      </div>
    </section>
  );
}

export default AdminDashboard;
