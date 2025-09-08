"use client";
import { CiLogin } from "react-icons/ci";
import { FaFileArchive } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import useStore from "@/store/store";
function Navbar() {
  const [navScrolled, setNavScrolled] = useState(false);
  const session = useStore((state) => state.session);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (
    session === "authenticated" ||
    pathname.startsWith("/student") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/lecturer")
  ) {
    return null;
  }
  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 w-full text-white shadow-md p-3 duration-300 ease-in-out 
    ${navScrolled ? "bg-mainPurple/80 backdrop-blur-sm" : "bg-mainPurple"}`}
    >
      <div className="wrapper flex items-center justify-between">
        {/* logo */}
        <Link href={"/"} className="flex items-center">
          <div className="mr-2 w-8 h-8 rounded-full border-[2px] border-white flex items-center justify-center p-2">
            <FaFileArchive className="md:text-lg" />
          </div>
          <span className="md:text-lg font-bold uppercase">
            Digital Archive System
          </span>
        </Link>

        <div className="md:hidden">
          <Link href={"/login"} className="text-3xl">
            <CiLogin className="text-3xl" />
          </Link>
        </div>

        {/* desktop cta buttons */}
        <div className="items-center gap-3 hidden md:flex">
          <Link
            href="/login"
            className="bg-[#EBD3F8] text-brightPurple px-6 py-2 rounded-sm text-sm 
            font-medium hover:opacity-80 transition duration-200 uppercase"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-brightPurple text-white px-6 py-2 rounded-sm text-sm 
            font-medium hover:bg-brightPurple/90 transition duration-200 uppercase"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
