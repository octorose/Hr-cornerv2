import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { pages } from "next/dist/build/templates/app-page";
import CredentialsProvider from "next-auth/providers/credentials";
import { RequestInternal, User } from "next-auth";
import Users from "../../../../Models/Users";
import connect from "@/package/MongoDb/db";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// const Prisma = new PrismaClient();
export const options = {
  // adapter: PrismaAdapter(Prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials
      ) {
        try {
          console.log("credentials", credentials);
          connect();
        const users = await Users.find({ Username: credentials?.username });
        console.log(users); // Log the users array to the console
        if (users.length > 0) {
          const user = users[0];
          if (user.Password === credentials?.password) {
            return user as User; // Cast user object as type 'User'
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
      catch (error) {
        console.error(error);
        return null;
      }
      
    }
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.id = token.id;
      console.log("ut?");

      console.log(session);

      return session;
    },
  },
};
