"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
function Footer() {
  const currentDate = new Date().getFullYear();
  const session = useSession();
  const pathname = usePathname();
  if (
    session.status === "authenticated" ||
    pathname.startsWith("/student") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/lecturer")
  ) {
    return null;
  }
  return (
    <footer className="w-full bg-brightPurple/70 text-white text-center p-3">
      <p className="wrapper">
        &copy; {currentDate} Digital Archive. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
