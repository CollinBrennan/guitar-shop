import { z } from 'zod'
import { Color } from '@prisma/client'

const productItemSchema = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number().int(),
  imageUrl: z.string().optional(),
  color: z.nativeEnum(Color).optional(),
})

export const insertProductSchema = z.object({
  name: z.string(),
  price: z.number().int(),
  description: z.string(),
  slug: z.string(),
  imageUrl: z.string().optional(),
  items: z.array(productItemSchema).min(1),
})
