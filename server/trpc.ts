import { getSession } from '@auth/express'
import { initTRPC, TRPCError } from '@trpc/server'
import { authConfig } from './lib/auth.ts'
import { Role } from '@prisma/client'
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'

export const createContext = async (opts: CreateExpressContextOptions) => {
  const session = await getSession(opts.req, authConfig)

  return { session }
}

type Context = Awaited<ReturnType<typeof createContext>>

export const t = initTRPC.context<Context>().create()

export const router = t.router

export const procedure = t.procedure

export const authProcedure = procedure.use((opts) => {
  const session = opts.ctx.session
  if (!session) throw new TRPCError({ code: 'UNAUTHORIZED' })

  return opts.next({
    ctx: { session },
  })
})

export const adminProcedure = authProcedure.use((opts) => {
  const session = opts.ctx.session
  if (session.user.role !== Role.admin)
    throw new TRPCError({ code: 'UNAUTHORIZED' })

  return opts.next()
})
