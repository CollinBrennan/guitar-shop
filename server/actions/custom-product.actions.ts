import prisma from '../lib/prisma.ts'
import type {
  CreateCustomProductData,
  CustomProduct,
} from '../schema/custom-product.schema.ts'

export async function getCustomProducts(): Promise<CustomProduct[]> {
  const products = await prisma.customProduct.findMany()

  return products as CustomProduct[]
}

export async function getCustomProductBySlug(
  slug: string
): Promise<CustomProduct> {
  const product = await prisma.customProduct.findFirst({ where: { slug } })

  return product as CustomProduct
}

export async function createCustomProduct(
  data: CreateCustomProductData
): Promise<CustomProduct> {
  const customProduct = await prisma.customProduct.create({ data })

  return customProduct as CustomProduct
}

export async function deleteCustomProducts() {
  await prisma.customProduct.deleteMany()
}
