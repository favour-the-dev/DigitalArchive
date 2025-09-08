"use client";
import { usePathname } from "next/navigation";
import useStore from "@/store/store";
function Footer() {
  const currentDate = new Date().getFullYear();
  const pathname = usePathname();
  const session = useStore((state) => state.session);
  if (
    session === "authenticated" ||
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
