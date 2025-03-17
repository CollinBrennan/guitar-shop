import { z } from 'zod'
import { customChoicesSchema } from './custom-product.schema.ts'

const cartItemSchema = z.object({
  sku: z.string(),
  quantity: z.number().int().positive().max(99),
})

const customCartItemSchema = z.object({
  sku: z.string(),
  customChoices: customChoicesSchema,
})

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
  customItems: z.array(customCartItemSchema),
})

export type CartItem = z.infer<typeof cartItemSchema>

export type CustomCartItem = z.infer<typeof customCartItemSchema>

export type Cart = z.infer<typeof cartSchema>
