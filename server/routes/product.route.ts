import express from 'express'
import dotenv from 'dotenv'
import { insertProductSchema } from '../schema/product.ts'
import prisma from '../lib/prisma.ts'
import { authAdmin } from '../lib/middleware.ts'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

dotenv.config()

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
  const products = await prisma.product.findMany()
  res.json({ products: products })
})

productRouter.post('/', authAdmin, async (req, res) => {
  const parsed = insertProductSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      message: 'Product data invalid',
      issues: parsed.error.issues,
    })
    return
  }

  try {
    const product = await prisma.product.create({
      data: {
        ...parsed.data,
        items: { create: parsed.data.items },
      },
    })
    res.json({ productId: product.id })
    return
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(409).json({
        message: 'Conflict creating product',
        name: error.name,
        code: error.code,
        meta: error.meta,
      })
      return
    }
  }

  res.status(500)
})

export default productRouter
