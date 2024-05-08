import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
import { NextAuthOptions, Session } from "next-auth";

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
    async signIn({ profile, user }): Promise<string | boolean> {
      //connect to DB
      await connectDB();

      //check if user exists
      const currentUser = await User.findOne({ email: profile?.email });

      if (!currentUser) {
        const username = profile?.name?.slice(0, 20);
        await User.create({
          email: user.email,
          username,
          image: user.image,
        });
      }

      return true;
    },

    //modifies teh session object
    async session({ session }): Promise<Session> {
      const currentUser = await User.findOne({ email: session?.user?.email });

      //assign the user ID to the session
      session.user.id = currentUser._id.toString();
      return session;
    },
  },
};
