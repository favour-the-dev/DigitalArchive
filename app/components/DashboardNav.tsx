"use client";
import { FaFileArchive } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Menu, X, Bell } from "lucide-react";
import { LayoutDashboard, Search, Book, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import SignOutBtn from "@/actions/auth";
function DashboardNav() {
  const pathName = usePathname();
  const session = useSession();

  const studentLinks = [
    { name: "Dashboard", href: "/student/dashboard", Icon: LayoutDashboard },
    {
      name: "Search Documents",
      href: "/student/search-documents",
      Icon: Search,
    },
    { name: "My Downloads", href: "/student/downloads", Icon: Book },
    { name: "Settings", href: "/student/settings", Icon: Settings },
  ];

  const studentNavLinkHeaders = [
    {
      path: "/student/dashboard",
      title: "Student Dashboard",
    },
  ];
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <nav
      className={`relative w-full flex items-center justify-center border-b p-4 md:p-0 border-b-gray-100/10 shadow-sm bg-mainPurple text-[#EBD3F8]`}
    >
      <div className="w-full flex items-center justify-between">
        {/*  */}
        <div className="flex items-center gap-5">
          {/* menu bar */}
          <div className="md:hidden">
            <Menu onClick={() => setIsNavOpen(true)} className="text-lg" />
            {/* overlay */}
            <div
              onClick={() => setIsNavOpen(false)}
              className={`absolute top-0 left-0 w-full h-screen bg-black/50 transition-opacity duration-300 ${
                isNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />
            <div
              className={`absolute top-0 w-[75%] h-screen border-r border-r-gray-100/10 
                flex flex-col justify-between bg-mainPurple text-[#EBD3F8] py-5 px-3 
                duration-300 ease-in-out ${
                  isNavOpen
                    ? "opacity-100 left-0"
                    : "opacity-0 pointer-events-none left-[-100%]"
                }`}
            >
              <div className="absolute top-0 right-0 py-4 px-2">
                <X onClick={() => setIsNavOpen(false)} className="text-white" />
              </div>
              <div className="flex flex-col gap-3">
                {/* logo */}
                <div className="flex p-3 items-center border-b border-b-gray-100/10">
                  <div className="mr-2 w-8 h-8 rounded-full border-[2px] border-white flex items-center justify-center p-2">
                    <FaFileArchive />
                  </div>
                  <span className="font-bold uppercase block">
                    Digital Archive System
                  </span>
                </div>
                <div className="mt-4">
                  {session?.data?.user?.role === "student" &&
                    studentLinks.map(({ name, href, Icon }) => (
                      <Link
                        onClick={() => setIsNavOpen(false)}
                        key={name}
                        href={href}
                        className={`my-1 flex items-center gap-2 p-3 hover:bg-brightPurple/30 
                        ${pathName === href ? "bg-brightPurple/30" : ""}`}
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
                    <p className="text-xs text-gray-400">
                      {session?.data?.user?.email}
                    </p>
                    <p className="text-xs text-blue-300 capitalize">
                      {session?.data?.user?.role}
                    </p>
                  </div>
                )}
                <hr className="h-[0.5px] border-gray-100/10" />
                <SignOutBtn />
              </div>
            </div>
          </div>
          {/* logo */}
          <div className="w-[275px] hidden md:flex p-3 items-center border-r border-r-gray-100/10">
            <div className="mr-2 w-8 h-8 rounded-full border-[2px] border-white flex items-center justify-center p-2">
              <FaFileArchive />
            </div>
            <span className="font-bold uppercase hidden md:block">
              Digital Archive System
            </span>
          </div>
          {/* title based on path Name */}
          <h1 className="md:text-lg font-bold">
            {
              studentNavLinkHeaders.find((link) => link.path === pathName)
                ?.title
            }
          </h1>
        </div>

        {/* actions */}
        <div className="flex items-center gap-3 px-3">
          {/* notificaition bt */}
          <Bell className="w-6 h-6" />
          {/* profile-mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="border-0 focus:outline-0">
                <div
                  className="w-8 h-8  rounded-full 
            flex items-center justify-center p-2 bg-brightPurple/80"
                >
                  {session?.data?.user?.name?.charAt(0).toUpperCase()}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 border-0 bg-transparent">
                <div className="bg-mainPurple text-[#EBD3F8] p-3">
                  <p className="text-sm font-medium capitalize">
                    {session?.data?.user?.name}
                  </p>
                  <p className="text-xs">
                    {session?.data?.user?.role === "student" &&
                      session?.data?.user?.matricNumber}
                  </p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* profile-desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <div
              className="w-8 h-8  rounded-full 
            flex items-center justify-center p-2 bg-brightPurple/80"
            >
              {session?.data?.user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="">
              <p className="text-sm font-medium capitalize">
                {session?.data?.user?.name}
              </p>
              <p className="text-xs">
                {session?.data?.user?.role === "student" &&
                  session?.data?.user?.matricNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;
