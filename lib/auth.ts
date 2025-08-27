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

        return user;
      },
        }),
    ],
    session:{
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    }
}