import { z } from 'zod'
import { customChoicesSchema } from './custom-product.schema.ts'

export const cartItemsSchema = z.object({
  items: z.record(
    z.string(),
    z.object({ quantity: z.number().int().positive().max(99) })
  ),
  customItems: z.array(
    z.object({ sku: z.string(), customChoices: customChoicesSchema })
  ),
})

export type CartItems = z.infer<typeof cartItemsSchema>
