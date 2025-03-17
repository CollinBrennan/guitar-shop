import prisma from '../lib/prisma.ts'
import type { Cart } from '../schema/checkout.schema.ts'
import type { ItemWithProductRecord } from '../schema/item.schema.ts'

export async function getItemDataFromCart(
  cart: Cart
): Promise<ItemWithProductRecord> {
  const skus = cart.items.map((item) => item.sku)
  const items = await prisma.item.findMany({
    distinct: ['id'],
    where: {
      sku: {
        in: skus,
      },
    },
    include: {
      product: true,
    },
  })

  const itemsRecord = items.reduce(
    (items, item) => ({ ...items, [item.sku]: item }),
    {}
  )

  return itemsRecord as ItemWithProductRecord
}

export async function deleteItems() {
  await prisma.item.deleteMany()
}
