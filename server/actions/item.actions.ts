import { skuFromCartItemSku } from '../lib/helpers.ts'
import prisma from '../lib/prisma.ts'
import type { CartItems } from '../schema/checkout.schema.ts'
import type {
  ItemsWithProductRecord,
  ItemWithProduct,
} from '../schema/item.schema.ts'

export async function getItemsFromCart(
  cartItems: CartItems
): Promise<ItemsWithProductRecord> {
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
  }, {} as ItemsWithProductRecord)

  return itemsRecord
}

export async function deleteItems() {
  await prisma.item.deleteMany()
}
