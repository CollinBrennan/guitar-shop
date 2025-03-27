import { cartProcedure, router } from '../lib/trpc.ts'

const itemRouter = router({
  listWithProductFromCart: cartProcedure.query(({ ctx }) => ({
    itemData: ctx.itemData,
    customProductData: ctx.customProductData,
  })),
})

export default itemRouter
