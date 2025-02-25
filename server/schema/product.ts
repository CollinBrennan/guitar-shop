import { z } from 'zod'

export const createCustomOptionSchema = z.record(
  z.string(),
  z.object({
    name: z.string(),
    options: z.record(
      z.string(),
      z.object({
        name: z.string(),
        color: z.string().optional(),
        surcharge: z.number().int().nonnegative(),
      })
    ),
  })
)

const createProductItemSchema = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number().int().positive(),
  imageUrl: z.string().optional(),
  color: z.string().optional(),
  customOptions: createCustomOptionSchema.optional(),
})

export const createProductSchema = z.object({
  name: z.string(),
  price: z.number().int().positive(),
  description: z.string(),
  slug: z.string(),
  imageUrl: z.string().optional(),
  items: z.array(createProductItemSchema).min(1),
})
