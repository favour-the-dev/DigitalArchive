import DashboardNav from "@/app/components/DashboardNav";
import type { Metadata } from "next";
import SideBar from "@/app/components/SideBar";

export const metadata: Metadata = {
  title: "Admin Dashboard | Digital Archive System",
  description: "Manage users and content approvals",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <DashboardNav />
      <div className="flex flex-1 min-h-0">
        <SideBar />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
