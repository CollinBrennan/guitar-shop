import { z } from 'zod'

export const cartSchema = z.record(
  z.string(), // item SKU
  z.number().int().positive().max(99) // item price
)
