import express from 'express'
import dotenv from 'dotenv'
import productsroute from './routers/productsroutes.js'
import usersroutes from './routers/usersroutes.js'
import ordersroutes from './routers/ordersroutes.js'
import connectDB from './database/db.js'
import { notFound, errorHandler } from './middleware/errormiddleware.js'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('API running .....')
})
app.use('/api/products', productsroute)
app.use('/api/users', usersroutes)
app.use('/api/orders', ordersroutes)

app.use('/api/config/paypl', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use(notFound)
app.use(errorHandler)
app.listen(5000, console.log('server running on port'))
