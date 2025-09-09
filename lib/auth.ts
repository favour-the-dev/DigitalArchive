import connectDB from "./mongoose";
import User from "@/models/user";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
             name: "Credentials",
             id: "credentials",
             credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("User not found");
        }

        if(!user.isActive){
            throw new Error("User is not active");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        await user.updateLastLogin();

        return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || user.email,
            role: user.role,
            matricNumber: user.matricNumber || null,
            dignitary: user.dignitary || null,
          }
      },
        }),
    ],
    session:{
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
    async jwt({ token, user }) {
      // On first login, persist user data into token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.matricNumber = user.matricNumber ?? undefined;
        token.dignitary = user.dignitary ?? undefined;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          matricNumber: token.matricNumber || null,
          dignitary: token.dignitary || null,
        },
      };
    },
  },
}