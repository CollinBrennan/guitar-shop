import mongoose from 'mongoose'

const variationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  color: String,
  image: String,
})

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  variations: [variationSchema],
})

export const Product = mongoose.model('Product', productSchema)
