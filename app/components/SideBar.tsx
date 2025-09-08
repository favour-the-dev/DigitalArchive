"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SignOutBtn from "@/actions/auth";
import {
  LayoutDashboard,
  Search,
  Book,
  Settings,
  Upload,
  File,
  Users,
  List,
} from "lucide-react";
import useStore from "@/store/store";

const studentLinks = [
  { name: "Dashboard", href: "/student/dashboard", Icon: LayoutDashboard },
  { name: "Search Documents", href: "/student/search-documents", Icon: Search },
  { name: "My Downloads", href: "/student/downloads", Icon: Book },
  { name: "Settings", href: "/student/settings", Icon: Settings },
];
const lecturerLinks = [
  { name: "Dashboard", href: "/lecturer/dashboard", Icon: LayoutDashboard },
  {
    name: "Upload Documents",
    href: "/lecturer/upload-documents",
    Icon: Upload,
  },
  { name: "My Uploads", href: "/lecturer/my-uploads", Icon: File },
  { name: "Settings", href: "/lecturer/settings", Icon: Settings },
];

const adminLinks = [
  { name: "Dashboard", href: "/admin/dashboard", Icon: LayoutDashboard },
  { name: "User Management", href: "/admin/user-management", Icon: Users },
  { name: "Content Approval", href: "/admin/content-approval", Icon: List },
  { name: "System Logs", href: "/admin/system-logs", Icon: File },
  { name: "Settings", href: "/admin/settings", Icon: Settings },
];
function SideBar() {
  const pathname = usePathname();
  const user = useStore((state) => state.userProfile);
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-500";
      case "student":
        return "text-blue-500";
      case "lecturer":
        return "text-green-500";
      default:
        return "";
    }
  };
  return (
    <aside className="w-[275px] border-r border-r-gray-100/10 hidden md:flex flex-col justify-between bg-mainPurple text-[#EBD3F8] py-5 px-3">
      <div className="flex flex-col gap-3">
        <div className="mt-4">
          {user && user?.role === "student"
            ? studentLinks.map(({ name, href, Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`my-1 flex items-center gap-2 p-3 hover:bg-brightPurple/30 
                ${pathname === href ? "bg-brightPurple/30" : ""}`}
                >
                  <Icon className="text-lg" />
                  <span className="text-sm font-medium">{name}</span>
                </Link>
              ))
            : user?.role === "lecturer"
            ? lecturerLinks.map(({ name, href, Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`my-1 flex items-center gap-2 p-3 hover:bg-brightPurple/30 
                ${pathname === href ? "bg-brightPurple/30" : ""}`}
                >
                  <Icon className="text-lg" />
                  <span className="text-sm font-medium">{name}</span>
                </Link>
              ))
            : user?.role === "admin" &&
              adminLinks.map(({ name, href, Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`my-1 flex items-center gap-2 p-3 hover:bg-brightPurple/30 
                ${pathname === href ? "bg-brightPurple/30" : ""}`}
                >
                  <Icon className="text-lg" />
                  <span className="text-sm font-medium">{name}</span>
                </Link>
              ))}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {/* profile data */}
        {user && (
          <div className="flex flex-col">
            <p className="text-xs text-gray-400">{user?.email}</p>
            <p
              className={`text-xs ${getRoleColor(user?.role ?? "")} capitalize`}
            >
              {user?.role}
            </p>
          </div>
        )}
        <hr className="h-[0.5px] border-gray-100/10" />
        <SignOutBtn />
      </div>
    </aside>
  );
}

export default SideBar;
