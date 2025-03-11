import stripe from '../lib/stripe.ts'
import { lineItemsFromCart } from '../lib/helpers.ts'
import { TRPCError } from '@trpc/server'
import { cartProcedure, router } from '../lib/trpc.ts'

const checkoutRouter = router({
  create: cartProcedure.mutation(async ({ ctx, input }) => {
    try {
      const lineItems = lineItemsFromCart(input, ctx.items)
      const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: lineItems,
        mode: 'payment',
        redirect_on_completion: 'never',
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
})

export default checkoutRouter
