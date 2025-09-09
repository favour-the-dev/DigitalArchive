import DashboardHeader from "@/app/components/header";
import DashboardCard from "@/app/components/student/dashboard/card";
import StudentActivity from "@/app/components/student/dashboard/activity";
import { Search, Book, Download } from "lucide-react";

function StudentDashboard() {
  return (
    <section className="w-full h-full p-3 flex flex-col gap-4">
      <DashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DashboardCard
          icon={<Search />}
          color="bg-blue-500"
          textColor="text-blue-500"
          title="Search Documents"
          desc="Find lecture notes, assignments, and more"
          href="/student/search-documents"
          label="Browse all documents →"
        />
        <DashboardCard
          icon={<Book />}
          color="bg-green-500"
          textColor="text-green-500"
          title="Recent Uploads"
          desc="Check out newly added academic materials"
          href="/student/recent-uploads"
          label="View recent uploads →"
        />
        <DashboardCard
          icon={<Download />}
          color="bg-brightPurple"
          textColor="text-brightPurple"
          title="My Downloads"
          desc="Access your previously downloaded documents"
          href="/student/my-downlaoads"
          label="View my downloads →"
        />
      </div>
      <StudentActivity />
    </section>
  );
}

export default StudentDashboard;
