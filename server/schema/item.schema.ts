import { z } from 'zod'

export const createOptionFieldsSchema = z.record(
  z.string(), // option field (ex. size)
  z.object({
    name: z.string(),
    options: z.record(
      z.string(), // option (ex. medium)
      z.object({
        name: z.string(),
        color: z.string().optional(),
        fee: z.number().int().nonnegative(),
      })
    ),
  })
)

export const createItemSchema = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number().int().positive(),
  imageUrl: z.string().optional(),
  color: z.string().optional(),
  optionFields: createOptionFieldsSchema.optional(),
})

export type OptionFieldsData = z.infer<typeof createOptionFieldsSchema>
export type ItemData = z.infer<typeof createItemSchema>
