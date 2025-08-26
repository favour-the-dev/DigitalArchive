import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongoose";
import User from "@/models/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findByEmail(credentials.email);
        if (!user) return null;
        if (!user.isActive) return null;

        const passwordMatch = await user.comparePassword(credentials.password);
        if (!passwordMatch) return null;

        await user.updateLastLogin();

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || user.email,
          role: user.role,
        };
      }
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // This will run on signIn/signOut if you use redirect: true
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    // ❌ ignored in App Router – leave it out
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
