import express from 'express'
import cors from 'cors'
import productRouter from './routes/product.ts'

const app = express()

const corsOptions = {
  origin: 'http://localhost:3001',
}

app.use(cors(corsOptions))

app.use('/api/product', productRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
