import express from 'express'
import cors from 'cors'
import productRouter from './routes/product.route.ts'
import { ExpressAuth } from '@auth/express'
import morgan from 'morgan'
import { authConfig } from './lib/auth.ts'
import checkoutRouter from './routes/checkout.route..ts'

const app = express()

const corsOptions = {
  origin: 'http://localhost:3001',
}

const apiRouter = express.Router()

// middleware
app.use(morgan('tiny'))
app.use(cors(corsOptions))
app.use(express.json())

// set up api routes
apiRouter.use('/auth/*', ExpressAuth(authConfig))
apiRouter.use('/product', productRouter)
apiRouter.use('/checkout', checkoutRouter)

app.use('/api', apiRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
