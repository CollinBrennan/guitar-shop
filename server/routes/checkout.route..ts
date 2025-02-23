import express from 'express'
import { cartSchema } from '../schema/checkout.ts'
import stripe from '../lib/stripe.ts'
import prisma from '../lib/prisma.ts'
import type { z } from 'zod'
import type { Product, ProductItem } from '@prisma/client'

type Cart = z.infer<typeof cartSchema>
type ItemData = { product: Product } & ProductItem

const checkoutRouter = express.Router()

checkoutRouter.post('/', async (req, res) => {
  const parsedCart = cartSchema.safeParse(req.body)

  if (!parsedCart.success) {
    res.status(400).json({ message: 'Invalid cart items' })
    return
  }

  const skus = Object.keys(parsedCart.data)
  const items = await prisma.productItem.findMany({
    where: {
      sku: {
        in: skus,
      },
    },
    include: {
      product: true,
    },
  })

  if (items.length === 0) {
    res.status(400).json({ message: 'Cart cannot be empty' })
    return
  }

  const lineItems = lineItemsFromCart(parsedCart.data, items)
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000',
    line_items: lineItems,
    mode: 'payment',
  })

  res.json({ url: session.url })
})

export default checkoutRouter

function lineItemsFromCart(cart: Cart, items: ItemData[]) {
  const lineItems = items.map((item) => ({
    price_data: {
      unit_amount: item.price,
      currency: 'usd',
      product_data: {
        description: item.product.description,
        name: item.product.name + ' - ' + item.name,
        images: item.product.imageUrl ? [item.product.imageUrl] : [],
      },
    },
    quantity: cart[item.sku],
  }))

  return lineItems
}
