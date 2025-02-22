import express from 'express'
import dotenv from 'dotenv'
import { Product } from '../models/product.model.ts'

dotenv.config()

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
  const products = await Product.find({})
  res.json({ products: products })
})

export default productRouter
