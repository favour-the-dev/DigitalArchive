import DashboardHeader from "@/app/components/header";
import DashboardCard from "@/app/components/student/dashboard/card";
import { Upload, File, Clock } from "lucide-react";
import LecturerActivity from "@/app/components/lecturer/dashboard/activity";

function LecturerDashboard() {
  return (
    <section className="w-full h-full p-3 flex flex-col gap-4">
      <DashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DashboardCard
          icon={<Upload />}
          color="bg-blue-500"
          textColor="text-blue-500"
          title="Upload Documents"
          desc="Share lecture notes, assignments, and more"
          href="/lecturer/upload-documents"
          label="Upload new documents →"
        />
        <DashboardCard
          icon={<File />}
          color="bg-green-500"
          textColor="text-green-500"
          title="My Uploads"
          desc="Manage your uploaded documents"
          href="/lecturer/my-uploads"
          label="View my uploads →"
        />
        <DashboardCard
          icon={<Clock />}
          color="bg-yellow-100"
          iconColor="text-yellow-800"
          textColor="text-yellow-100"
          title="Pending Approvals"
          desc="Track status of your pending uploads"
          href="/lecturer/pending-approvals"
          label="Check pending status →"
        />
      </div>
      <LecturerActivity />
    </section>
  );
}

export default LecturerDashboard;
