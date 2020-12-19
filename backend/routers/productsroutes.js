import express from 'express'
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controller/productController.js'
import { authorization, isAdmin } from '../middleware/auth.js'
import { notFound } from '../middleware/errormiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(authorization, isAdmin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(authorization, isAdmin, deleteProduct)
  .patch(authorization, isAdmin, updateProduct)

router.route('*').get(notFound)
export default router
