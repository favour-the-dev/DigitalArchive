"use client";
import useStore from "@/store/store";
function DashboardHeader() {
  const user = useStore((state) => state.userProfile);
  return (
    <h1 className="text-lg md:text-xl my-2 font-semibold">
      Welcome {user && user?.name.split(" ")[0]}, to your Digital Archive
      System.
    </h1>
  );
}

export default DashboardHeader;
