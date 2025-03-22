import prisma from '../lib/prisma.ts'
import type { Cart } from '../schema/checkout.schema.ts'
import type { ItemWithProductRecord } from '../schema/item.schema.ts'

export async function getItemDataFromCart(cart: Cart) {
  const itemSkus = cart.items.map((item) => item.sku)

  const itemsWithProduct = await prisma.item.findMany({
    distinct: ['id'],
    where: { sku: { in: itemSkus } },
    include: { product: true },
  })

  const itemData: ItemWithProductRecord = itemsWithProduct.reduce(
    (items, item) => ({ ...items, [item.sku]: item }),
    {}
  )

  return itemData
}

export async function deleteItems() {
  await prisma.item.deleteMany()
}
