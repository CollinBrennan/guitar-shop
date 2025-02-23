import { z } from 'zod'
import { Color } from '@prisma/client'

const productItemSchema = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number().int().positive(),
  imageUrl: z.string().optional(),
  color: z.nativeEnum(Color).optional(),
})

export const createProductSchema = z.object({
  name: z.string(),
  price: z.number().int().positive(),
  description: z.string(),
  slug: z.string(),
  imageUrl: z.string().optional(),
  items: z.array(productItemSchema).min(1),
})
