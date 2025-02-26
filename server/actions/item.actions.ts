import type { Product, Item } from '@prisma/client'
import prisma from '../lib/prisma.ts'

export type ProductItem = { product: Product } & Item

export async function getItemsFromSkus(skus: string[]): Promise<ProductItem[]> {
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

  return items
}
