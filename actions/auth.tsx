"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutBtn() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center"
    >
      <LogOut className="mr-2" />
      <span className="">Sign Out</span>
    </button>
  );
}
