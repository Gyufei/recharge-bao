import NextAuth from "next-auth"
import Google from 'next-auth/providers/google'
 
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
 
const prisma = new PrismaClient()
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
    authorized: async ({ auth: isAuth }) => {
      return !!isAuth
    },
  },
  providers: [Google],
})