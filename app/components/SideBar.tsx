"use client";
import { usePathname } from "next/navigation";
import { FaFileArchive } from "react-icons/fa";
import Link from "next/link";
import SignOutBtn from "@/actions/auth";
import { LayoutDashboard, Search, Book, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const studentLinks = [
  { name: "Dashboard", href: "/student/dashboard", Icon: LayoutDashboard },
  { name: "Search Documents", href: "/student/search-documents", Icon: Search },
  { name: "My Downloads", href: "/student/downloads", Icon: Book },
  { name: "Settings", href: "/student/settings", Icon: Settings },
];

function SideBar() {
  const pathname = usePathname();
  const session = useSession();

  useEffect(() => {
    if (session) {
      console.log(session);
    }
  }, [session]);

  return (
    <aside className="hidden md:flex flex-col justify-between bg-mainPurple text-[#EBD3F8] py-5 px-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <div className="mr-2 w-8 h-8 rounded-full border-[2px] border-white flex items-center justify-center p-2">
            <FaFileArchive />
          </div>
          <span className="font-bold uppercase">Digital Archive System</span>
        </div>
        <div className="mt-4">
          {session?.data?.user?.role === "student" &&
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
        {session && (
          <div className="flex flex-col">
            <p className="text-sm font-medium capitalize">
              {session?.data?.user?.name}
            </p>
            <p className="text-xs text-gray-400">
              {session?.data?.user?.email}
            </p>
            <p className="text-xs text-gray-400">
              {session?.data?.user?.matricNumber}
            </p>
            <p className="text-xs text-green-300 capitalize">
              {session?.data?.user?.role}
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
