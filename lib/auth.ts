import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getServerSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Google({
      name: "Google",
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usernameOrEmail: { label: "Username or Email", type: "text" },
        password: { lable: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.usernameOrEmail || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                email: credentials.usernameOrEmail,
              },
              {
                username: credentials.usernameOrEmail,
              },
            ],
          },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password!
        );
        if (!passwordMatch) {
          return null;
        }
        return {
          id: existingUser.id,
          email: existingUser.email,
          username: existingUser.username ?? "",
          image: existingUser.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      console.log("JWT - Token: ", token);
      console.log("JWT - User: ", user);
      console.log("JWT - Account: ", account);
      console.log("JWT - Trigger: ", trigger);
      console.log("JWT - Session: ", session);

      if (trigger === "update" && session?.username) {
        return {
          ...token,
          username: session.username,
        };
      }

      if (user) {
        return {
          ...token,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("Session - Session: ", session);
      console.log("Session - Token: ", token);
      console.log("Session - User: ", user);

      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      };
    },
    async signIn({ user, account, profile }) {
      console.log("SignIn - User: ", user);
      console.log("SignIn - Account: ", account);
      console.log("SignIn - Profile: ", profile);

      return true;
    },
  },
};

export function getServerAuthSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
