import Product from '../Models/productModel.js'

//TODO: getProducts
//@desc     Fetch all products
//@route    Get /api/prodoucts
//@access   public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})

    res.json(products)
  } catch (error) {
    res.json({ Error: error, message: error.message })
  }
}

//TODO: getProductById
//@desc     Fetch specific product
//@route    Get /api/prodoucts/:id
//@access   public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    res.json({ message: error.message })
  }
}

//TODO: delete product By ID
//@desc     delete product By ID
//@route    DELETE /api/prodoucts/:id
//@access   private/Admin
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    res.json({ message: error.message })
  }
}

export { getProducts, getProductById }
