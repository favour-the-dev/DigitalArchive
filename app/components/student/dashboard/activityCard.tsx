import { Download } from "lucide-react";

interface activityCardProps {
  title: string;
  dept: string;
  level: number;
  category: string;
  createdAt?: Date | string;
  time: string;
  size?: string;
}

function StudentActivityCard({
  title,
  dept,
  level,
  category,
  createdAt,
  time,
  size,
}: activityCardProps) {
  return (
    <div
      className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 
    border-b border-b-brightPurple/50 last:border-b-0 "
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-medium">{title}</h2>
        <div className="text-gray-500 text-xs font-medium flex items-center gap-2">
          <span>{dept}</span> | <span>{level} level</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-full flex items-center md:justify-end gap-2">
          <span
            className="w-fit bg-brightPurple/30 text-brightPurple text-sm px-3 py-1 
      rounded-md font-medium"
          >
            {category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 group hover:text-brightPurple cursor-pointer duration-200 ease-in-out">
            <Download className="w-4 h-4 text-gray-400 group-hover:text-brightPurple duration-200 ease-in-out" />
            Download
          </span>
        </div>
        <div className="text-gray-500 text-xs font-medium flex items-center gap-2">
          <span>{createdAt ? new Date(createdAt).toDateString() : "N/A"}</span>{" "}
          | <span>{time}</span> | <span>{size ? size : "N/A"}</span>
        </div>
      </div>
    </div>
  );
}

export default StudentActivityCard;
