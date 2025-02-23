import express from 'express'
import cors from 'cors'
import productRouter from './routes/product.route.ts'

const app = express()

const corsOptions = {
  origin: 'http://localhost:3001',
}

const apiRouter = express.Router()

app.use(cors(corsOptions))
app.use(express.json())

// set up api routes
apiRouter.use('/product', productRouter)

app.use('/api', apiRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
