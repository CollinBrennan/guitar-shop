import type { ExpressAuthConfig, DefaultSession } from '@auth/express'
import Google from '@auth/express/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma.ts'
import { Role } from '@prisma/client'
import type { Provider } from '@auth/express/providers'

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

const providers: Provider[] = [
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
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== 'credentials')

export const authConfig: ExpressAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers,
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      return session
    },
    redirect: () => 'http://localhost:3001',
  },
}
