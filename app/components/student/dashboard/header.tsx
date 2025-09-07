"use client";
import { useSession } from "next-auth/react";
function DashboardHeader() {
  const { data: session } = useSession();
  return (
    <h1 className="text-lg md:text-xl my-2 font-semibold">
      Welcome {session?.user?.name.split(" ")[0]}, to your Digital Archive
      System.
    </h1>
  );
}

export default DashboardHeader;
