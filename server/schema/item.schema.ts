import { z } from 'zod'
import type { Item as RawItem } from '@prisma/client'

const optionFieldsSchema = z.record(
  z.string(), // field value (ex. 'wood')
  z.object({
    name: z.string(),
    options: z.record(
      z.string(), // option value (ex. 'alder')
      z.object({
        name: z.string(),
        color: z.string().optional(),
        fee: z.number().int().nonnegative(),
      })
    ),
  })
)

const variantSchema = z.record(
  z.string(), // field value (ex. 'size')
  z.string() // option value (ex. 'medium')
)

export const createItemSchema = z.object({
  sku: z.string(),
  variant: variantSchema,
  price: z.number().int().positive(),
  imageUrl: z.string().optional(),
  optionFields: optionFieldsSchema.optional(),
})

export type CreateItemData = z.infer<typeof createItemSchema>

export type OptionFields = z.infer<typeof optionFieldsSchema>

export type Item = Omit<RawItem, 'optionFields' | 'variant'> & {
  variant: z.infer<typeof variantSchema>
  optionFields: OptionFields | null
}
