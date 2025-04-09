import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { ExpressAuth } from '@auth/express'
import { authConfig } from './lib/auth.ts'
import { createContext, router } from './lib/trpc.ts'
import { createExpressMiddleware } from '@trpc/server/adapters/express'

import productRouter from './routes/product.route.ts'
import customProductRouter from './routes/custom-product.route.ts'
import checkoutRouter from './routes/checkout.route.ts'
import itemRouter from './routes/item.route.ts'
import sessionRouter from './routes/session.route.ts'

const app = express()

const corsOptions = {
  origin: 'http://localhost:3001',
}

// trpc
const appRouter = router({
  item: itemRouter,
  product: productRouter,
  customProduct: customProductRouter,
  checkout: checkoutRouter,
  session: sessionRouter,
})

export type AppRouter = typeof appRouter

// middleware
app.use(morgan('tiny'))
app.use(cors(corsOptions))
app.use(express.json())

// routes
app.use('/api/auth/*', ExpressAuth(authConfig))
app.use(
  '/api',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

// start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
