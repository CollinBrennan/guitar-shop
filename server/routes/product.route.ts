import express from 'express'
import dotenv from 'dotenv'
import { insertProductSchema } from '../schema/product.ts'
import prisma from '../lib/prisma.ts'

dotenv.config()

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
  const products = await prisma.product.findMany()
  res.json({ products: products })
})

productRouter.post('/', async (req, res) => {
  const parsed = insertProductSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({ message: 'Product data invalid.' })
    return
  }

  const product = await prisma.product.create({ data: parsed.data })

  res.json({ productId: product.id })
})

export default productRouter
