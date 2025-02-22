import mongoose from 'mongoose'
import { connectDB } from './db.ts'
import { Product } from './models/product.model.ts'

async function seed() {
  await connectDB()

  const product = new Product({
    name: 'Guitar Picks - Medium',
    slug: 'guitar-picks-medium',
    price: '1000',
    description: 'Cool awesome guitar picks!',
    image: 'https://i.imgur.com/CqXC21j.jpeg',
    variations: [
      { name: '12 Pack', price: '1000' },
      { name: '24 Pack', price: '1800' },
    ],
  })

  const product2 = new Product({
    name: 'Instrument Cable',
    slug: 'instrument-cable',
    price: '1500',
    description: 'Cool awesome instrument cable!',
    image: 'https://i.imgur.com/CqXC21j.jpeg',
    variations: [
      { name: 'Black', color: '#000000', price: '1000' },
      { name: 'White', color: '#FFFFFF', price: '1800' },
    ],
  })

  await product.save()
  await product2.save()

  await mongoose.disconnect()
  console.log('Database seeded successfully. Closed connection.')
}

seed()
