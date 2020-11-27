import express from 'express'
import dotenv from 'dotenv'
import products from './Data/products.js'
import connectDB from './database/db.js'

dotenv.config()
connectDB()
const app = express()

app.get('/', (req, res) => {
  res.send('API running .....')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})
app.get('/api/product/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})
app.listen(5000, console.log('server running on port'))
