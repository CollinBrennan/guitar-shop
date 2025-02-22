import express from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'
import { type ProductData } from '../../types.ts'

dotenv.config()

const productRouter = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

productRouter.get('/', async (req, res) => {
  const products = await stripe.products.list({
    active: true,
    limit: 10,
    expand: ['data.default_price'],
  })

  const productData: ProductData[] = products.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      price: price.unit_amount,
      description: product.description,
      images: product.images,
    }
  })

  res.json({ products: productData })
})

export default productRouter
