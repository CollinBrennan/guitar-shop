import { z } from 'zod'
import { createItemSchema, type Item } from './item.schema.ts'
import type { Product as RawProduct } from '@prisma/client'

const variantFieldsSchema = z.record(
  z.string(), // field value (ex. 'size')
  z.object({
    name: z.string(),
    options: z.record(
      z.string(), // option value (ex. 'small')
      z.object({
        name: z.string(),
        color: z.string().optional(),
      })
    ),
  })
)

export const createProductSchema = z.object({
  name: z.string(),
  price: z.number().int().positive(),
  description: z.string(),
  slug: z.string(),
  imageUrl: z.string().optional(),
  variantFields: variantFieldsSchema.optional(),
  items: z.array(createItemSchema),
})

export type CreateProductData = z.infer<typeof createProductSchema>

export type Product = Omit<RawProduct, 'variantFields'> & {
  variantFields: z.infer<typeof variantFieldsSchema> | null
}

// needed to typecast raw json fields
export type ProductWithItems = Omit<Product, 'items'> & {
  items: Item[]
}
