"use client";
import { usePathname } from "next/navigation";
import { FaFileArchive } from "react-icons/fa";
import Link from "next/link";
import SignOutBtn from "@/actions/auth";
import { LayoutDashboard, Search, Book, Settings } from "lucide-react";

const studentLinks = [
  { name: "Dashboard", href: "/student/dashboard", Icon: LayoutDashboard },
  { name: "Search Documents", href: "/student/search-documents", Icon: Search },
  { name: "My Downloads", href: "/student/downloads", Icon: Book },
  { name: "Settings", href: "/student/settings", Icon: Settings },
];

function SideBar() {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col justify-between bg-mainPurple text-[#EBD3F8] py-5 px-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <div className="mr-2 w-8 h-8 rounded-full border-[2px] border-white flex items-center justify-center p-2">
            <FaFileArchive className="md:text-lg" />
          </div>
          <span className="md:text-lg font-bold uppercase">
            Digital Archive System
          </span>
        </div>
        <div>
          {studentLinks.map(({ name, href, Icon }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-2 p-3 hover:bg-mainPurple/10 
                ${pathname === href ? "bg-mainPurple/20" : ""}`}
            >
              <Icon className="text-lg" />
              <span className="text-sm font-medium">{name}</span>
            </Link>
          ))}
        </div>
      </div>
      <SignOutBtn />
    </aside>
  );
}

export default SideBar;
