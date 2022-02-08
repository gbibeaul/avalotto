import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizationProvider } from "tranport/authorization";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Wallet", type: "text", placeholder: "0x0" },
      },
      async authorize(_, req) {
        if (!req.body?.address) {
          return null;
        }

        const auth = await authorizationProvider();
        const isStaff = await auth.isStaff(req.body?.address);

        const user = { address: req.body.address };

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const auth = await authorizationProvider();
      const isStaff = await auth.isStaff(user.address);

      return isStaff;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
