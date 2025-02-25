import { z } from 'zod'

export const cartSchema = z.record(
  z.string(), // item SKU
  z.object({
    quantity: z.number().int().positive().max(99),
    choices: z.record(z.string(), z.string()).optional(), // { option: choice }
  })
)
