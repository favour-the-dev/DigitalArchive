"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SignOutBtn from "@/actions/auth";
import { LayoutDashboard, Search, Book, Settings } from "lucide-react";
import useStore from "@/store/store";

const studentLinks = [
  { name: "Dashboard", href: "/student/dashboard", Icon: LayoutDashboard },
  { name: "Search Documents", href: "/student/search-documents", Icon: Search },
  { name: "My Downloads", href: "/student/downloads", Icon: Book },
  { name: "Settings", href: "/student/settings", Icon: Settings },
];

function SideBar() {
  const pathname = usePathname();
  const user = useStore((state) => state.userProfile);

  return (
    <aside className="w-[275px] border-r border-r-gray-100/10 hidden md:flex flex-col justify-between bg-mainPurple text-[#EBD3F8] py-5 px-3">
      <div className="flex flex-col gap-3">
        <div className="mt-4">
          {user &&
            user?.role === "student" &&
            studentLinks.map(({ name, href, Icon }) => (
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
            <p className="text-xs text-blue-300 capitalize">{user?.role}</p>
          </div>
        )}
        <hr className="h-[0.5px] border-gray-100/10" />
        <SignOutBtn />
      </div>
    </aside>
  );
}

export default SideBar;
