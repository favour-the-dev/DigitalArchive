import { Download } from "lucide-react";

interface activityCardProps {
  title: string;
  dept: string;
  level: number;
  category: string;
  createdAt?: Date | string;
  status: string;
  time: string;
  size?: string;
}

function LecturerActivityCard({
  title,
  dept,
  level,
  category,
  createdAt,
  status,
  time,
  size,
}: activityCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div
      className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 
    border-b border-b-brightPurple/50 last:border-b-0 "
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-medium">{title}</h2>
        <div className="text-gray-500 text-xs font-medium flex flex-wrap items-center gap-2">
          <span>{dept}</span> | <span>{level} level</span> |
          <span>{createdAt ? new Date(createdAt).toDateString() : "N/A"}</span>{" "}
          | <span>{time}</span> | <span>{size ? size : "N/A"}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-full flex items-center md:justify-end gap-2">
          <span
            className={`w-fit ${getStatusColor(status)} text-sm px-3 py-1 
      rounded-md font-medium`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LecturerActivityCard;
