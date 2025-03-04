import { z } from 'zod'
import type { Item as RawItem } from '@prisma/client'
import type { Product } from './product.schema.ts'

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

const variantSchema = z.record(
  z.string(), // field value (ex. 'size')
  z.string() // option value (ex. 'medium')
)

export const customChoicesSchema = z.record(
  z.string(), // field value (ex. 'size')
  z.string() // option value (ex. 'medium')
)

export const createItemSchema = z.object({
  sku: z.string(),
  variant: variantSchema,
  price: z.number().int().positive(),
  imageUrl: z.string().optional(),
  customFields: customFieldsSchema.optional(),
  customDefaultChoices: customChoicesSchema.optional(),
})

export type CreateItemData = z.infer<typeof createItemSchema>

export type CustomFields = z.infer<typeof customFieldsSchema>

export type CustomChoices = z.infer<typeof customChoicesSchema>

export type Item = Omit<
  RawItem,
  'customFields' | 'variant' | 'customDefaultChoices'
> & {
  variant: z.infer<typeof variantSchema>
  customFields: CustomFields | null
  customDefaultChoices: CustomChoices | null
}

export type ItemWithProduct = Item & { product: Product }

export type ItemsWithProductRecord = Record<string, ItemWithProduct>
