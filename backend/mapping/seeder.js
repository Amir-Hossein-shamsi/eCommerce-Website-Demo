import dotenv from 'dotenv'
import User from '../Models/userModel.js'
import Product from '../Models/productModel.js'
import Order from '../Models/orderModel.js'
import users from './user.js'
import products from './products.js'
import connectDB from '../database/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    const sampleusers = await User.insertMany(users)
    const AdminUser_id = sampleusers[0]._id
    const sampleProduct = products.map((p) => {
      return { ...p, user: AdminUser_id }
    })

    await Product.insertMany(sampleProduct)

    console.log('Data imported')
    process.exit()
  } catch (error) {
    console.log(`===========> ${error} <============`)
    process.exit(1)
  }
}

const deletedData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    console.log('Data destroyed ')
    process.exit()
  } catch (error) {
    console.log(`===========> ${error} <============`)
    process.exit(1)
  }
}
if (process.argv[2] === '-d') {
  deletedData()
} else {
  importData()
}
