import { createProductSchema } from '../schema/product.schema.ts'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { createProduct, getProducts } from '../actions/product.actions.ts'
import { adminProcedure, procedure, router } from '../trpc.ts'
import { TRPCError } from '@trpc/server'

export const productRouter = router({
  list: procedure.query(async () => {
    const products = await getProducts()
    return products
  }),

  create: adminProcedure
    .input(createProductSchema)
    .mutation(async ({ input }) => {
      try {
        const product = await createProduct(input)
        return product
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError)
          throw new TRPCError({ code: 'CONFLICT', message: error.message })
      }
    }),
})

export default productRouter
