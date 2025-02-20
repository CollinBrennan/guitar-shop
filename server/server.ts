import express from 'express'
import cors from 'cors'

const app = express()

const corsOptions = {
  origin: 'http://localhost:3001',
}

app.use(cors(corsOptions))

app.get('/api', (req, res) => {
  res.json({ fruits: ['apple', 'banana'] })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
