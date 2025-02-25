import express from 'express'
import { cartSchema } from '../schema/checkout.ts'
import stripe from '../lib/stripe.ts'
import prisma from '../lib/prisma.ts'
import type { z } from 'zod'
import type { Product, ProductItem } from '@prisma/client'
import type { createCustomOptionSchema } from '../schema/product.ts'

type Cart = z.infer<typeof cartSchema>
type CustomOptions = z.infer<typeof createCustomOptionSchema>
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

  try {
    const lineItems = lineItemsFromCart(parsedCart.data, items)
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000',
      line_items: lineItems,
      mode: 'payment',
    })

    res.json({ url: session.url })
    return
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
      return
    }
  }

  res.status(500).json({ message: 'Internal server error' })
})

export default checkoutRouter

function lineItemsFromCart(cart: Cart, items: ItemData[]) {
  const lineItems = items.map((item) => {
    const cartItem = cart[item.sku]
    if (!cartItem) throw new Error('Cart item not found')

    let price = item.price
    if (item.customOptions) {
      if (!cartItem.choices) throw new Error('Custom item choices not provided')

      price = priceFromCustomOptions(
        item.price,
        cartItem.choices,
        item.customOptions as CustomOptions
      )
    }

    return {
      price_data: {
        unit_amount: price,
        currency: 'usd',
        product_data: {
          description: item.product.description,
          name: item.name,
          images: item.product.imageUrl ? [item.product.imageUrl] : [],
        },
      },
      quantity: cartItem.quantity,
    }
  })

  return lineItems
}

function priceFromCustomOptions(
  basePrice: number,
  choices: Record<string, string>,
  customOptions: CustomOptions
) {
  let price = basePrice
  for (let [optionName, optionGroup] of Object.entries(customOptions)) {
    const choice = choices[optionName]
    if (!choice) throw new Error('Invalid custom item choices')

    const option = optionGroup.options[choice]
    if (!option) throw new Error('Invalid custom item options')

    price += option.surcharge
  }

  return price
}
