import prisma from '../lib/prisma.ts'
import type {
  CreateCustomProductData,
  CustomProduct,
} from '../schema/custom-product.schema.ts'

export async function getCustomProducts(): Promise<CustomProduct[]> {
  const customProducts = await prisma.customProduct.findMany()

  return customProducts as CustomProduct[]
}

export async function createCustomProduct(
  data: CreateCustomProductData
): Promise<CustomProduct> {
  const customProduct = await prisma.customProduct.create({ data })

  return customProduct as CustomProduct
}
