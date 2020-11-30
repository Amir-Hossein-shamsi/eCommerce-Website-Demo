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
    res.status(500).json({ Error: error, messages: 'pls try again ' })
  }
})

//@desc     Fetch specific product
//@route    Get /api/prodoucts/:id
//@access   public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id })
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ messages: 'not founded' })
    }
  } catch (error) {
    res.status(500).json({ Error: error, messages: 'pls try again ' })
  }
})

export default router
