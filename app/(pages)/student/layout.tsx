import type { Metadata } from "next";
import SideBar from "@/app/components/SideBar";

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
    <div className="min-h-screen flex">
      <SideBar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
