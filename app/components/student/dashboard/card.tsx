import Link from "next/link";

interface dashboardCardProps {
  icon: React.JSX.Element;
  color: string;
  textColor: string;
  title: string;
  desc: string;
  href: string;
  label: string;
}

function DashboardCard({
  icon,
  color,
  textColor,
  title,
  desc,
  href,
  label,
}: dashboardCardProps) {
  return (
    <div className="border border-dashed border-brightPurple rounded-sm runded-md p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className={`p-4 rounded-xl ${color} text-white`}>{icon}</div>
        <div className="flex flex-col gap-1">
          <h2 className={`${textColor}`}>{title}</h2>
          <p className="text-gray-400 text-xs">{desc}</p>
        </div>
      </div>
      <Link href={href} className={`${textColor} text-xs`}>
        {label}
      </Link>
    </div>
  );
}

export default DashboardCard;
