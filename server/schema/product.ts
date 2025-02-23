import { z } from 'zod'

const variation = z.object({
  name: z.string(),
  price: z.number().int(),
  color: z.string().optional(),
  image: z.string().optional(),
})

export const insertProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  price: z.number().int(),
  description: z.string(),
  imageUrl: z.string(),
  variations: z.array(variation).optional(),
})
