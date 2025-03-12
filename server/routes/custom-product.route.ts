import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { adminProcedure, procedure, router } from '../lib/trpc.ts'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import {
  createCustomProduct,
  getCustomProductBySlug,
  getCustomProducts,
} from '../actions/custom-product.actions.ts'
import { createCustomProductSchema } from '../schema/custom-product.schema.ts'

const customProductRouter = router({
  getBySlug: procedure.input(z.string()).query(async ({ input }) => {
    const product = await getCustomProductBySlug(input)

    return product
  }),

  list: procedure.query(async () => {
    const products = await getCustomProducts()

    return products
  }),

  create: adminProcedure
    .input(createCustomProductSchema)
    .mutation(async ({ input }) => {
      try {
        const product = await createCustomProduct(input)

        return product
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError)
          throw new TRPCError({ code: 'CONFLICT', message: error.message })
      }
    }),
})

export default customProductRouter
