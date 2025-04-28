import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_SECRET_ID as string,
      }),
    ],
    adapter: PrismaAdapter(prisma),
    secret:process.env.NEXTAUTH_SECRET as string,
    callbacks: {
      session: async ({ session, token }) => {
        if (session.user) {
          session.user.id = token.sub as string;
        }
        return session;
      },
    },
    session: {
      strategy: "jwt", 
    },
    pages:{
      signIn:"/signin",
      error:"/signin/error",
      
    }
  };

  export {
    authOptions
  }