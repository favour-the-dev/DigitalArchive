interface activityCardProps {
  title: string;
  dept: string;
  level: number;
  category: string;
}

function StudentActivityCard({
  title,
  dept,
  level,
  category,
}: activityCardProps) {
  return (
    <div
      className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 
    border-b border-b-brightPurple/50 last:border-b-0 "
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-medium">{title}</h2>
        <div className="text-gray-400">
          <span>{dept}</span> | <span>{level} level</span>
        </div>
      </div>
      <span
        className="w-fit bg-brightPurple/30 text-brightPurple text-sm px-3 py-1 
      rounded-md font-medium"
      >
        {category}
      </span>
    </div>
  );
}

export default StudentActivityCard;
