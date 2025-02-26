import { cartSchema } from '../schema/checkout.schema.ts'
import stripe from '../lib/stripe.ts'
import { getItemsFromSkus } from '../actions/item.actions.ts'
import { lineItemsFromCart } from '../lib/helpers.ts'
import { procedure, router } from '../trpc.ts'
import { TRPCError } from '@trpc/server'

const checkoutRouter = router({
  create: procedure.input(cartSchema).mutation(async ({ input }) => {
    const skus = Object.keys(input)
    const items = await getItemsFromSkus(skus)

    if (items.length === 0)
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Cart is empty' })

    try {
      const lineItems = lineItemsFromCart(input, items)
      const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000',
        line_items: lineItems,
        mode: 'payment',
      })

      return session.url
    } catch (error) {
      if (error instanceof Error)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid cart items',
        })
    }
  }),
})

export default checkoutRouter
