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
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(404)
      throw new Error('Product not found')
    }
    await product.remove()
    res.json({ message: 'product removed' })
  } catch (error) {
    res.json({ message: error.message })
  }
}

//TODO: create product
//@desc     create product
//@route    POST /api/prodoucts
//@access   private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: 0,
      user: req.user._id,
      image: '/img/sample.jpg',
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      numReviews: 0,
      description: req.body.description,
    })
    const createdproduct = await product.save()
    res.status(201).json(createdproduct)
  } catch (error) {
    res.json({ message: error.message })
  }
}

//TODO: update product
//@desc     update product
//@route    PATCH /api/prodoucts/:id
//@access   private/Admin
const updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404)
      throw new Error('Product not found')
    }

    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedproduct = await product.save()

    res.json(updatedproduct)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
