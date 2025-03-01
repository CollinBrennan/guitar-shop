import { z } from 'zod'

const choicesSchema = z.record(z.string(), z.string()) // { option: choice }

export const cartItemsSchema = z.record(
  z.string(), // item SKU
  z.object({
    quantity: z.number().int().positive().max(99),
    choices: choicesSchema.optional(),
  })
)

export type Choices = z.infer<typeof choicesSchema>

export type CartItems = z.infer<typeof cartItemsSchema>
