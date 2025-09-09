import LecturerActivityCard from "./activityCard";
function LecturerActivity() {
  const recentActivity = [
    {
      title: "Introduction to Computer Science",
      dept: "Computer Science",
      level: 100,
      category: "Lecture Notes",
      createdAt: "2024-06-10",
      status: "approved",
      time: "2 hours ago",
      size: "1.2 MB",
    },
    {
      title: "Calculus I Assignment",
      dept: "Mathematics",
      level: 100,
      category: "Assignment",
      createdAt: "2024-06-12",
      status: "pending",
      time: "1 day ago",
      size: "500 KB",
    },
    {
      title: "Principles of Economics",
      dept: "Economics",
      level: 300,
      category: "Past Questions",
      createdAt: "2024-06-11",
      status: "rejected",
      time: "3 days ago",
      size: "750 KB",
    },
    {
      title: "Organic Chemistry Lab Manual",
      dept: "Chemistry",
      level: 400,
      category: "Lab Manual",
      createdAt: "2024-06-09",
      status: "approved",
      time: "5 days ago",
      size: "2 MB",
    },
    {
      title: "Development of a student Blog",
      dept: "Computer Science",
      level: 400,
      category: "Final Year Project",
      createdAt: "2024-06-08",
      status: "rejected",
      time: "1 week ago",
      size: "3.5 MB",
    },
  ];
  return (
    <div className="mt-4 flex flex-col gap-3">
      <h2 className="md:text-lg">Recent Uploads</h2>
      <div className="border border-brightPurple/50 rounded-md">
        {recentActivity.map((activity, index) => (
          <LecturerActivityCard key={index} {...activity} />
        ))}
      </div>
    </div>
  );
}

export default LecturerActivity;
