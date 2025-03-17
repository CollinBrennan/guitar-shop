import { z } from 'zod'
import type { Item as DbItem } from '@prisma/client'
import type { Product } from './product.schema.ts'

const variantSchema = z.record(
  z.string(), // field value (ex. 'size')
  z.string() // option value (ex. 'medium')
)

export const createItemSchema = z.object({
  sku: z.string(),
  price: z.number().int().nonnegative(),
  imageUrl: z.string().optional(),
  variant: variantSchema,
})

export type CreateItemData = z.infer<typeof createItemSchema>

export type Item = Omit<DbItem, 'variant'> & {
  variant: z.infer<typeof variantSchema>
}

export type ItemWithProduct = Item & { product: Product }

export type ItemWithProductRecord = Record<string, ItemWithProduct>
