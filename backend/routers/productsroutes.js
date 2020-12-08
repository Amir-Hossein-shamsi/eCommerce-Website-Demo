import express from 'express'
import Product from '../Models/productModel.js'

const router = express.Router()

//@desc     Fetch all products
//@route    Get /api/prodoucts
//@access   public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})

    res.json(products)
  } catch (error) {
    res.status(500).json({ Error: error, message: 'server is Down' })
  }
})

//@desc     Fetch specific product
//@route    Get /api/prodoucts/:id
//@access   public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    // throw new Error()
    if (product) {
      res.json(product)
    } else if (!product) {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    res.status(500).json({ message: 'pls try again ' })
  }
})

export default router
