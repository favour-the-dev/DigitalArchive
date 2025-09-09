"use client";
import { FaFileArchive } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Menu, X, Bell } from "lucide-react";
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
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import SignOutBtn from "@/actions/auth";
import useStore from "@/store/store";
function DashboardNav() {
  const pathname = usePathname();
  const user = useStore((state) => state.userProfile);

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

  const studentNavLinkHeaders = [
    {
      path: "/student/dashboard",
      title: "Student Dashboard",
    },
  ];
  const lecturerNavLinkHeaders = [
    {
      path: "/lecturer/dashboard",
      title: "Lecturer Dashboard",
    },
  ];
  const adminNavLinkHeaders = [
    {
      path: "/admin/dashboard",
      title: "Admin Dashboard",
    },
  ];
  const [isNavOpen, setIsNavOpen] = useState(false);
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
                  {user && user?.role === "student"
                    ? studentLinks.map(({ name, href, Icon }) => (
                        <Link
                          onClick={() => setIsNavOpen(false)}
                          key={name}
                          href={href}
                          className={`my-1 flex items-center gap-2 p-3 hover:bg-brightPurple/30 
                                  ${
                                    pathname === href
                                      ? "bg-brightPurple/30"
                                      : ""
                                  }`}
                        >
                          <Icon className="text-lg" />
                          <span className="text-sm font-medium">{name}</span>
                        </Link>
                      ))
                    : user?.role === "lecturer"
                    ? lecturerLinks.map(({ name, href, Icon }) => (
                        <Link
                          onClick={() => setIsNavOpen(false)}
                          key={name}
                          href={href}
                          className={`my-1 flex items-center gap-2 p-3 hover:bg-brightPurple/30 
                                  ${
                                    pathname === href
                                      ? "bg-brightPurple/30"
                                      : ""
                                  }`}
                        >
                          <Icon className="text-lg" />
                          <span className="text-sm font-medium">{name}</span>
                        </Link>
                      ))
                    : user?.role === "admin" &&
                      adminLinks.map(({ name, href, Icon }) => (
                        <Link
                          onClick={() => setIsNavOpen(false)}
                          key={name}
                          href={href}
                          className={`my-1 flex items-center gap-2 p-3 hover:bg-brightPurple/30 
                                  ${
                                    pathname === href
                                      ? "bg-brightPurple/30"
                                      : ""
                                  }`}
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
                      className={`text-xs ${getRoleColor(
                        user?.role ?? ""
                      )} capitalize`}
                    >
                      {user?.role}
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
            {user && user?.role === "student"
              ? studentNavLinkHeaders.find((link) => link.path === pathname)
                  ?.title
              : user?.role === "lecturer"
              ? lecturerNavLinkHeaders.find((link) => link.path === pathname)
                  ?.title
              : user?.role === "admin"
              ? adminNavLinkHeaders.find((link) => link.path === pathname)
                  ?.title
              : ""}
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
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 border-0 bg-transparent">
                <div className="bg-mainPurple text-[#EBD3F8] p-3">
                  <p className="text-sm font-medium capitalize">
                    {user && user?.role === "lecturer" && user?.dignitary}{" "}
                    {user?.name}
                  </p>
                  <p className="text-xs">
                    {user?.role === "student" && user?.matricNumber}
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
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="">
              <p className="text-sm font-medium capitalize">
                {user && user?.role === "lecturer" && user?.dignitary}{" "}
                {user?.name}
              </p>
              <p className="text-xs">
                {user?.role === "student" && user?.matricNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;
