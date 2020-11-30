import express from 'express'
import dotenv from 'dotenv'
import productsroute from './routers/productsroutes.js'
import connectDB from './database/db.js'

dotenv.config()
connectDB()
const app = express()

app.get('/', (req, res) => {
  res.send('API running .....')
})

app.use('/api/products', productsroute)
app.listen(5000, console.log('server running on port'))
