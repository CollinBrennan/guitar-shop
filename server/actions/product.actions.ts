import type { Product } from '@prisma/client'
import prisma from '../lib/prisma.ts'
import type { ProductData } from '../schema/product.schema.ts'

export async function getProducts(): Promise<Product[]> {
  const products = prisma.product.findMany()

  return products
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
