import { z } from 'zod'
import { createItemSchema } from './item.schema.ts'

export const createProductSchema = z.object({
  name: z.string(),
  price: z.number().int().positive(),
  description: z.string(),
  slug: z.string(),
  imageUrl: z.string().optional(),
  items: z.array(createItemSchema).min(1),
})

export type ProductData = z.infer<typeof createProductSchema>
