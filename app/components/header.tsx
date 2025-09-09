"use client";
import useStore from "@/store/store";
import { useEffect } from "react";
function DashboardHeader() {
  const user = useStore((state) => state.userProfile);
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <h1 className="text-xl md:text-2xl my-2 font-semibold">
      Welcome {user && user?.role === "lecturer" && user?.dignitary}{" "}
      {user && user?.name.split(" ")[0]}, to your Digital Archive System.
    </h1>
  );
}

export default DashboardHeader;
