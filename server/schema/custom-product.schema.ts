import { z } from 'zod'
import type { CustomProduct as DbCustomProduct } from '@prisma/client'
import { specsSchema } from './product.schema.ts'

const customFieldsSchema = z.record(
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

export const customChoicesSchema = z.record(
  z.string(), // field value (ex. 'size')
  z.string() // option value (ex. 'medium')
)

export const createCustomProductSchema = z.object({
  sku: z.string(),
  name: z.string(),
  model: z.string(),
  slug: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number().int().nonnegative(),
  imageUrl: z.string().optional(),
  specs: specsSchema.optional(),
  customFields: customFieldsSchema,
  customDefaults: customChoicesSchema,
})

export type CustomFields = z.infer<typeof customFieldsSchema>

export type CustomChoices = z.infer<typeof customChoicesSchema>

export type CreateCustomProductData = z.infer<typeof createCustomProductSchema>

export type CustomProduct = Omit<
  DbCustomProduct,
  'customFields' | 'customDefaults'
> & {
  customFields: CustomFields
  customDefaults: CustomChoices
}

export type CustomProductRecord = Record<string, CustomProduct>
