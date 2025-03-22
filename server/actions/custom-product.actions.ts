import prisma from '../lib/prisma.ts'
import type { Cart } from '../schema/checkout.schema.ts'
import type {
  CreateCustomProductData,
  CustomProduct,
  CustomProductRecord,
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

export async function getCustomProductDataFromCart(cart: Cart) {
  const itemSkus = cart.customItems.map((item) => item.sku)

  const products = await prisma.customProduct.findMany({
    distinct: ['id'],
    where: { sku: { in: itemSkus } },
  })

  const productData: CustomProductRecord = products.reduce(
    (items, item) => ({ ...items, [item.sku]: item }),
    {}
  )

  return productData
}

export async function createCustomProduct(
  data: CreateCustomProductData
): Promise<CustomProduct> {
  const product = await prisma.customProduct.create({ data })

  return product as CustomProduct
}

export async function deleteCustomProducts() {
  await prisma.customProduct.deleteMany()
}
