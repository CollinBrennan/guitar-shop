import { z } from 'zod'
import { createItemSchema } from './item.schema.ts'

const variantFieldsSchema = z.record(
  z.string(), // field value (ex. 'size')
  z.record(
    z.string(), // option value (ex. 'small')
    z.object({
      name: z.string(),
      color: z.string().optional(),
    })
  )
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

export type ProductData = z.infer<typeof createProductSchema>
