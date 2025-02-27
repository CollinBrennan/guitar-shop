import { z } from 'zod'

export const createOptionFieldsSchema = z.record(
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

export const variantSchema = z.record(
  z.string(), // field value (ex. 'size')
  z.string() // option value (ex. 'medium')
)

export const createItemSchema = z.object({
  sku: z.string(),
  variant: variantSchema,
  price: z.number().int().positive(),
  imageUrl: z.string().optional(),
  optionFields: createOptionFieldsSchema.optional(),
})

export type OptionFieldsData = z.infer<typeof createOptionFieldsSchema>
export type Variant = z.infer<typeof variantSchema>
export type ItemData = z.infer<typeof createItemSchema>
