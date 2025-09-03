import type { Metadata } from "next";
import SideBar from "@/app/components/SideBar";
import DashboardNav from "@/app/components/DashboardNav";

export const metadata: Metadata = {
  title: "Student Dashboard | Digital Archive System",
  description: "Manage your courses and assignments",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen min-w-screen overflow-hidden flex flex-col">
      <DashboardNav />
      <div className="flex flex-1 min-h-0">
        <SideBar />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
