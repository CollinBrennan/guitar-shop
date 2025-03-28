import { z } from 'zod'
import { createItemSchema, type Item } from './item.schema.ts'
import type { Product as DbProduct } from '@prisma/client'

const variantFieldsSchema = z.record(
  z.string(), // field value (ex. 'size')
  z.object({
    name: z.string(),
    isColor: z.boolean().default(false).optional(),
    options: z.record(
      z.string(), // option value (ex. 'small')
      z.object({
        name: z.string(),
        color: z.string().optional(),
      })
    ),
  })
)

export const specsSchema = z.array(
  z.object({
    label: z.string(),
    body: z.string(),
  })
)

export const createProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number().int().nonnegative(),
  imageUrl: z.string(),
  specs: specsSchema.optional(),
  variantFields: variantFieldsSchema.optional(),
  items: z.array(createItemSchema),
})

export type CreateProductData = z.infer<typeof createProductSchema>

export type Specs = z.infer<typeof specsSchema>

export type Product = Omit<DbProduct, 'variantFields'> & {
  variantFields: z.infer<typeof variantFieldsSchema> | null
}

export type ProductWithItems = Omit<Product, 'items'> & {
  items: Item[]
}
