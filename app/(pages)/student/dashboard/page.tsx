import DashboardHeader from "@/app/components/student/dashboard/header";
import DashboardCard from "@/app/components/student/dashboard/card";
import StudentActivityCard from "@/app/components/student/dashboard/activity";
import { Search, Book, Download } from "lucide-react";

function StudentDashboard() {
  const recentActivity = [
    {
      title: "Introduction to Computer Science",
      dept: "Computer Science",
      level: 100,
      category: "Lecture Notes",
      createdAt: "2024-06-10",
      time: "2 hours ago",
      size: "1.2 MB",
    },
    {
      title: "Calculus I Assignment",
      dept: "Mathematics",
      level: 100,
      category: "Assignment",
      createdAt: "2024-06-12",
      time: "1 day ago",
      size: "500 KB",
    },
    {
      title: "Principles of Economics",
      dept: "Economics",
      level: 300,
      category: "Past Questions",
      createdAt: "2024-06-11",
      time: "3 days ago",
      size: "750 KB",
    },
    {
      title: "Organic Chemistry Lab Manual",
      dept: "Chemistry",
      level: 400,
      category: "Lab Manual",
      createdAt: "2024-06-09",
      time: "5 days ago",
      size: "2 MB",
    },
    {
      title: "Development of a student Blog",
      dept: "Computer Science",
      level: 400,
      category: "Final Year Project",
      createdAt: "2024-06-08",
      time: "1 week ago",
      size: "3.5 MB",
    },
  ];
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
      <div className="mt-4 flex flex-col gap-3">
        <h2 className="md:text-lg">Recently Added Documents</h2>
        <div className="border border-brightPurple/50 rounded-md">
          {recentActivity.map((activity, index) => (
            <StudentActivityCard key={index} {...activity} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudentDashboard;
