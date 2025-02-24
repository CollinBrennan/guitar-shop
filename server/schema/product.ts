import { z } from 'zod'

const customOptionChoiceSchema = z.object({
  name: z.string(),
  value: z.string(),
  color: z.string().optional(),
  surcharge: z.number().int().nonnegative(),
})

const customOptionSchema = z.object({
  name: z.string(),
  value: z.string(),
  choices: z.array(customOptionChoiceSchema),
})

const productItemSchema = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number().int().positive(),
  imageUrl: z.string().optional(),
  color: z.string().optional(),
  isCustom: z.boolean(),
  customOptions: z.array(customOptionSchema).optional(),
})

export const createProductSchema = z.object({
  name: z.string(),
  price: z.number().int().positive(),
  description: z.string(),
  slug: z.string(),
  imageUrl: z.string().optional(),
  items: z.array(productItemSchema).min(1),
})
