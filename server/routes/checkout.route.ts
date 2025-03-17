import stripe from '../lib/stripe.ts'
import { lineItemsFromCart } from '../lib/helpers.ts'
import { TRPCError } from '@trpc/server'
import { cartProcedure, procedure, router } from '../lib/trpc.ts'
import { z } from 'zod'

const checkoutRouter = router({
  create: cartProcedure.mutation(async ({ ctx, input }) => {
    try {
      const lineItems = lineItemsFromCart(input, ctx.items)

      const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: lineItems,
        mode: 'payment',
        return_url: 'http://localhost:3001/order?id={CHECKOUT_SESSION_ID}',
      })

      return session.client_secret
    } catch (error) {
      if (error instanceof Error)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message,
        })
    }
  }),

  get: procedure.input(z.string()).query(async ({ input }) => {
    const session = await stripe.checkout.sessions.retrieve(input)

    return {
      status: session.status,
      customerEmail: session.customer_details?.email,
    }
  }),
})

export default checkoutRouter
