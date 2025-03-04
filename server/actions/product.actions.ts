import prisma from '../lib/prisma.ts'
import type {
  Product,
  CreateProductData,
  ProductWithItems,
} from '../schema/product.schema.ts'

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
  productData: CreateProductData
): Promise<Product> {
  const product = await prisma.product.create({
    data: {
      ...productData,
      items: { create: productData.items },
    },
  })

  return product as Product
}

export async function deleteProducts() {
  await prisma.product.deleteMany()
}
