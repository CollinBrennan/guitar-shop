import { getSession } from '@auth/express'
import { initTRPC, TRPCError } from '@trpc/server'
import { authConfig } from './auth.ts'
import { Role } from '@prisma/client'
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { cartSchema } from '../schema/checkout.schema.ts'
import { getItemDataFromCart } from '../actions/item.actions.ts'

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

export const cartProcedure = procedure.input(cartSchema).use(async (opts) => {
  const cartItems = opts.input
  const items = await getItemDataFromCart(cartItems)

  if (Object.keys(items).length === 0)
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Cart is empty' })

  return opts.next({
    ctx: { items },
  })
})
