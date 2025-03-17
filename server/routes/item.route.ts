import { cartProcedure, router } from '../lib/trpc.ts'

const itemRouter = router({
  listWithProductFromCart: cartProcedure.query(({ ctx }) => ctx.items),
})

export default itemRouter
