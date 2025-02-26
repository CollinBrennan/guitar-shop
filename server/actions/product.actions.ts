import type { Item, Product } from '@prisma/client'
import prisma from '../lib/prisma.ts'
import type { OptionFieldsData } from '../schema/item.schema.ts'
import type { ProductData } from '../schema/product.schema.ts'

export async function getProducts(): Promise<Product[]> {
  const products = prisma.product.findMany()

  return products
}

export async function getProductWithItemsBySlug(slug: string) {
  const productWithItems = await prisma.product.findFirst({
    where: { slug },
    include: {
      items: true,
    },
  })

  // prisma doesn't know the shape of option field json
  type ProductWithItems = Product & {
    items: Array<
      Omit<Item, 'optionFields'> & {
        optionFields: OptionFieldsData | null
      }
    >
  }

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

  return product
}
