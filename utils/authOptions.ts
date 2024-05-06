import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invoked on successful signing
    async signIn({ profile }) {
      //TODO:connect, check for the user, add if needed, return "true"
      return profile;
    },

    //modifies teh session object
    async session({ session }) {
      //TODO: get the user, assign  ID to session, return session
      return session;
    },
  },
};
