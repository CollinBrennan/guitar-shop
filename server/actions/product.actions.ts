import type { Item as RawItem, Product as RawProduct } from '@prisma/client'
import prisma from '../lib/prisma.ts'
import type { OptionFieldsData, Variant } from '../schema/item.schema.ts'
import type { ProductData, VariantFields } from '../schema/product.schema.ts'

// needed to typecast raw json fields
type Item = Omit<RawItem, 'optionFields' | 'variant'> & {
  variant: Variant
  optionFields: OptionFieldsData | null
}

type Product = Omit<RawProduct, 'variantFields'> & {
  variantFields: VariantFields | null
}

type ProductWithItems = Omit<Product, 'items'> & {
  items: Item[]
}

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany()

  return products as Product[]
}

export async function getProductWithItemsBySlug(
  slug: string
): Promise<ProductWithItems> {
  const productWithItems = await prisma.product.findFirst({
    where: { slug },
    include: {
      items: true,
    },
  })

  return productWithItems as ProductWithItems
}

export async function createProduct(
  productData: ProductData
): Promise<Product> {
  const product = await prisma.product.create({
    data: {
      ...productData,
      items: { create: productData.items },
    },
  })

  return product as Product
}
