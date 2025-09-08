"use client";
import type React from "react";
import { SessionProvider, useSession } from "next-auth/react";
import useStore from "@/store/store";
import { useEffect } from "react";
import { UserProfile } from "@/store/store";

const Authenticate = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useSession();
  const setUserProfile = useStore((state) => state.setUserProfile);
  const setSession = useStore((state) => state.setSession);

  useEffect(() => {
    if (status === "authenticated" && data?.user) {
      setUserProfile(data.user as UserProfile);
      setSession(status);
    } else if (status === "unauthenticated") {
      setUserProfile(null);
      setSession(status);
    }
  }, [status, data, setUserProfile, setSession]);

  return <>{children}</>;
};

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Authenticate>{children}</Authenticate>
    </SessionProvider>
  );
}
