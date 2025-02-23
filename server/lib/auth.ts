import type { ExpressAuthConfig, DefaultSession } from '@auth/express'
import Google from '@auth/express/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma.ts'
import { Role } from '@prisma/client'

// add 'role' to session object
declare module '@auth/express' {
  interface Session {
    user: {
      role: string
    } & DefaultSession['user']
  }

  export interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    role: Role
  }
}

export const authConfig: ExpressAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: Role.user,
        }
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      return session
    },
  },
}
