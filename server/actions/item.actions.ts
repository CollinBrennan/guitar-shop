import prisma from '../lib/prisma.ts'
import type { Item } from '../schema/item.schema.ts'
import type { Product } from '../schema/product.schema.ts'

export type ItemWithProduct = { product: Product } & Item

export async function getItemsFromSkus(
  skus: string[]
): Promise<ItemWithProduct[]> {
  const items = await prisma.item.findMany({
    where: {
      sku: {
        in: skus,
      },
    },
    include: {
      product: true,
    },
  })

  return items as ItemWithProduct[]
}
