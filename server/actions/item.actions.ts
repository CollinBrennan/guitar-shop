import { skuFromCartItemSku } from '../lib/helpers.ts'
import prisma from '../lib/prisma.ts'
import type { CartItems } from '../schema/checkout.schema.ts'
import type { Item } from '../schema/item.schema.ts'
import type { Product } from '../schema/product.schema.ts'

export type ItemWithProduct = { product: Product } & Item

export type ItemsRecord = Record<string, ItemWithProduct>

export async function getItemsFromCart(
  cartItems: CartItems
): Promise<ItemsRecord> {
  const skus = Object.keys(cartItems).map((sku) => skuFromCartItemSku(sku))
  const items = (await prisma.item.findMany({
    distinct: ['id'],
    where: {
      sku: {
        in: skus,
      },
    },
    include: {
      product: true,
    },
  })) as ItemWithProduct[]

  const itemsRecord = items.reduce((acc, item) => {
    acc[item.sku] = item
    return acc
  }, {} as ItemsRecord)

  return itemsRecord
}
