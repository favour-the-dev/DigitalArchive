import {create} from 'zustand';

export type UserProfile = {
    id: string;
    email: string;
    name: string;
    role: "student" | "lecturer" | "admin";
    matricNumber?: string | null;
}

interface appStoreProps {
    session: "authenticated" | "unauthenticated" | "loading";
    userProfile: UserProfile | null;
    setSession: (status: "authenticated" | "unauthenticated" | "loading") => void;
    setUserProfile: (profile: UserProfile | null) => void;
    clearUserProfile: () => void;
}

const useStore = create<appStoreProps>((set) => ({
    session: "unauthenticated",
    userProfile: null,
    setSession: (status) => set({ session: status }),
    setUserProfile: (profile) => set({ userProfile: profile }),
    clearUserProfile: () => set({ userProfile: null }),
}));

export default useStore;