import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('Connected to MongoDB')
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to MongoDB: ' + error.message)
    }
  }
}
