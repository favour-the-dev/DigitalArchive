"use client";
import type React from "react";
import { SessionProvider } from "next-auth/react";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProvider>{children}</SessionProvider>;
}
