import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {
  createProduct,
  getProducts,
  getProductWithItemsBySlug,
} from '../actions/product.actions.ts'
import { adminProcedure, procedure, router } from '../lib/trpc.ts'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createProductSchema } from '../schema/product.schema.ts'

const productRouter = router({
  get: procedure.input(z.string()).query(async ({ input }) => {
    const product = await getProductWithItemsBySlug(input)
    return product
  }),

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
