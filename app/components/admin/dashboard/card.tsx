import Link from "next/link";

interface AdminCardProps {
  icon: React.JSX.Element;
  color: string;
  iconColor?: string;
  textColor: string;
  title: string;
  value: string;
  href: string;
  label: string;
}

function AdminCard({
  icon,
  color,
  iconColor,
  textColor,
  title,
  value,
  href,
  label,
}: AdminCardProps) {
  return (
    <div className="border border-dashed border-brightPurple rounded-sm runded-md p-5 flex flex-col gap-3">
      <div className="flex items-center gap-5">
        <div className={`p-4 rounded-xl ${color} ${iconColor}`}>{icon}</div>
        <div className="flex flex-col gap-1">
          <h2 className={`${textColor} text-xs`}>{title}</h2>
          <p className="text-gray-400 text-2xl font-medium">{value}</p>
        </div>
      </div>
      <Link href={href} className={`${textColor} text-xs`}>
        {label}
      </Link>
    </div>
  );
}

export default AdminCard;
