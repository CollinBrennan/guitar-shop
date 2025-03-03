import { z } from 'zod'
import { customChoicesSchema } from './item.schema.ts'

export const cartItemsSchema = z.record(
  z.string(), // item SKU
  z.object({
    quantity: z.number().int().positive().max(99),
    customChoices: customChoicesSchema,
  })
)

export type CartItems = z.infer<typeof cartItemsSchema>
