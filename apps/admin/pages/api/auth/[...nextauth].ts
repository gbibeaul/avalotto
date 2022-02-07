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

        return {
          address: req.body.address,
          isStaff,
        };
      },
    }),
  ],
});
